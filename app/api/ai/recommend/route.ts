import { NextRequest, NextResponse } from 'next/server';
import { generateResponse, isAvailable } from '@/lib/ai/gemini';
import { getCached, setCached } from '@/lib/ai/cache';
import { sanitizeInput, validateResponse } from '@/lib/ai/filter';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/middleware/auth';

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user
    const authResult = await verifyAuth(request);
    if (!authResult.valid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Authentication required',
          },
        },
        { status: 401 }
      );
    }

    // 2. Parse request body
    const body = await request.json();
    const { budget, duration, preferences } = body;

    if (!budget || !duration) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Budget and duration are required',
          },
        },
        { status: 400 }
      );
    }

    // 3. Build recommendation prompt
    const sanitizedPreferences = preferences ? sanitizeInput(preferences) : 'general use';
    const prompt = `Recommend vehicles for a customer with:
- Budget: $${budget}/day
- Rental Duration: ${duration} days
- Preferences: ${sanitizedPreferences}

Provide 2-3 specific recommendations with reasoning.`;

    // 4. Check cache
    const cached = getCached(prompt);
    if (cached) {
      return NextResponse.json({
        success: true,
        data: {
          recommendations: cached,
          source: 'cache',
          cached: true,
        },
      });
    }

    // 5. Gather available vehicles data
    const vehicles = await prisma.vehicle.findMany({
      where: {
        isAvailable: true,
        dailyPrice: {
          lte: parseFloat(budget.toString()),
        },
      },
      orderBy: {
        dailyPrice: 'asc',
      },
      take: 10,
    });

    const vehicleContext = `Available vehicles within budget ($${budget}/day):
${vehicles
  .map((v) => `- ${v.brand} ${v.model}: $${v.dailyPrice}/day`)
  .join('\n')}

${vehicles.length === 0 ? 'Note: No vehicles found within exact budget. Consider nearby options.' : ''}`;

    // 6. Try AI recommendation
    let recommendationText: string;
    let source: 'ai' | 'fallback';

    if (isAvailable()) {
      const aiResult = await generateResponse(prompt, vehicleContext);

      if (aiResult.success) {
        const validation = validateResponse(aiResult.text);
        recommendationText = validation.filtered;
        source = 'ai';
      } else {
        // Fallback to deterministic recommendations
        recommendationText = getFallbackRecommendations(vehicles, budget, duration);
        source = 'fallback';
      }
    } else {
      // AI not configured - use fallback
      recommendationText = getFallbackRecommendations(vehicles, budget, duration);
      source = 'fallback';
    }

    // 7. Cache the recommendation
    setCached(prompt, recommendationText);

    // 8. Return response
    return NextResponse.json({
      success: true,
      data: {
        recommendations: recommendationText,
        availableVehicles: vehicles.length,
        source,
        cached: false,
      },
    });
  } catch (error) {
    console.error('❌ Recommendation API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
        },
      },
      { status: 500 }
    );
  }
}

/**
 * Fallback recommendation logic (deterministic)
 */
function getFallbackRecommendations(
  vehicles: any[],
  budget: number,
  duration: number
): string {
  if (vehicles.length === 0) {
    return `Unfortunately, no vehicles are currently available within your budget of $${budget}/day. Please consider increasing your budget or contact us to discuss alternatives.`;
  }

  const totalBudget = budget * duration;
  const topVehicles = vehicles.slice(0, 3);

  let recommendation = `Based on your budget of $${budget}/day for ${duration} days (total: $${totalBudget}), here are my recommendations:\n\n`;

  topVehicles.forEach((vehicle, index) => {
    const totalCost = parseFloat(vehicle.dailyPrice.toString()) * duration;
    recommendation += `${index + 1}. **${vehicle.brand} ${vehicle.model}**\n`;
    recommendation += `   - Daily Rate: $${vehicle.dailyPrice}\n`;
    recommendation += `   - Total Cost: $${totalCost.toFixed(2)} (${duration} days)\n`;
    recommendation += `   - Savings: $${(totalBudget - totalCost).toFixed(2)}\n\n`;
  });

  recommendation += `All vehicles are currently available and ready to rent. Would you like to proceed with a booking?`;

  return recommendation;
}
