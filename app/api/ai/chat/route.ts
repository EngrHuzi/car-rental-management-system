import { NextRequest, NextResponse } from 'next/server';
import { generateResponse, isAvailable } from '@/lib/ai/gemini';
import { getCached, setCached } from '@/lib/ai/cache';
import { getFallbackResponse } from '@/lib/ai/fallback';
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
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Prompt is required and must be a string',
          },
        },
        { status: 400 }
      );
    }

    // 3. Sanitize user input
    const sanitizedPrompt = sanitizeInput(prompt);

    // 4. Check cache first
    const cached = getCached(sanitizedPrompt);
    if (cached) {
      return NextResponse.json({
        success: true,
        data: {
          response: cached,
          source: 'cache',
          cached: true,
        },
      });
    }

    // 5. Gather system context (real data from database)
    const [vehicleCount, availableVehicles, activeRentals, avgRating] = await Promise.all([
      prisma.vehicle.count(),
      prisma.vehicle.count({ where: { isAvailable: true } }),
      prisma.rental.count({ where: { status: 'active' } }),
      prisma.feedback.aggregate({ _avg: { rating: true } }),
    ]);

    const systemContext = `You are an AI assistant for a Car Rental Management System.

Current System Status:
- Total Vehicles: ${vehicleCount}
- Available Vehicles: ${availableVehicles}
- Active Rentals: ${activeRentals}
- Average Customer Rating: ${avgRating._avg.rating?.toFixed(1) || 'N/A'}/5

Your role is to help staff members with:
1. Vehicle availability and recommendations
2. Rental process guidance
3. Customer management
4. System usage and best practices

Keep responses concise, professional, and helpful. Do not expose sensitive customer data.`;

    // 6. Try AI response first
    let responseText: string;
    let source: 'ai' | 'fallback';

    if (isAvailable()) {
      const aiResult = await generateResponse(sanitizedPrompt, systemContext);

      if (aiResult.success) {
        // Validate and filter AI response
        const validation = validateResponse(aiResult.text);

        if (validation.warnings.length > 0) {
          console.log('⚠️  Response warnings:', validation.warnings);
        }

        responseText = validation.filtered;
        source = 'ai';
      } else {
        // AI failed - use fallback
        console.log(`⚠️  AI failed (${aiResult.error}) - using fallback`);
        responseText = getFallbackResponse(sanitizedPrompt);
        source = 'fallback';
      }
    } else {
      // AI not configured - use fallback
      console.log('⚠️  AI not configured - using fallback');
      responseText = getFallbackResponse(sanitizedPrompt);
      source = 'fallback';
    }

    // 7. Cache the response
    setCached(sanitizedPrompt, responseText);

    // 8. Return response
    return NextResponse.json({
      success: true,
      data: {
        response: responseText,
        source,
        cached: false,
      },
    });
  } catch (error) {
    console.error('❌ Chat API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
          details:
            process.env.NODE_ENV === 'development'
              ? error instanceof Error
                ? error.message
                : String(error)
              : undefined,
        },
      },
      { status: 500 }
    );
  }
}
