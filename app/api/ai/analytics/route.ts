import { NextRequest, NextResponse } from 'next/server';
import { generateResponse, isAvailable } from '@/lib/ai/gemini';
import { getCached, setCached } from '@/lib/ai/cache';
import { validateResponse } from '@/lib/ai/filter';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
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

    // 2. Gather analytics data
    const [
      totalVehicles,
      availableVehicles,
      totalRentals,
      activeRentals,
      completedRentals,
      totalRevenue,
      avgRating,
      feedbackCount,
      totalCustomers,
    ] = await Promise.all([
      prisma.vehicle.count(),
      prisma.vehicle.count({ where: { isAvailable: true } }),
      prisma.rental.count(),
      prisma.rental.count({ where: { status: 'active' } }),
      prisma.rental.count({ where: { status: 'completed' } }),
      prisma.rental.aggregate({ _sum: { totalCost: true } }),
      prisma.feedback.aggregate({ _avg: { rating: true } }),
      prisma.feedback.count(),
      prisma.customer.count({ where: { isDeleted: false } }),
    ]);

    const utilizationRate = totalVehicles > 0
      ? ((totalVehicles - availableVehicles) / totalVehicles * 100).toFixed(1)
      : '0';

    const analyticsData = {
      totalVehicles,
      availableVehicles,
      totalRentals,
      activeRentals,
      completedRentals,
      totalRevenue: totalRevenue._sum.totalCost?.toString() || '0',
      avgRating: avgRating._avg.rating?.toFixed(2) || 'N/A',
      feedbackCount,
      totalCustomers,
      utilizationRate,
    };

    // 3. Build analytics prompt
    const prompt = `Analyze the following car rental business metrics and provide 3-5 key insights and recommendations:

Metrics:
- Total Vehicles: ${totalVehicles}
- Available Vehicles: ${availableVehicles}
- Utilization Rate: ${utilizationRate}%
- Active Rentals: ${activeRentals}
- Completed Rentals: ${completedRentals}
- Total Revenue: $${analyticsData.totalRevenue}
- Average Customer Rating: ${analyticsData.avgRating}/5.0
- Total Feedback Count: ${feedbackCount}
- Total Customers: ${totalCustomers}

Provide concise, actionable insights about:
1. Business performance
2. Customer satisfaction trends
3. Operational efficiency
4. Growth opportunities`;

    // 4. Check cache
    const cached = getCached(prompt);
    if (cached) {
      return NextResponse.json({
        success: true,
        data: {
          metrics: analyticsData,
          insights: cached,
          source: 'cache',
          cached: true,
        },
      });
    }

    // 5. Try AI insights
    let insightsText: string;
    let source: 'ai' | 'fallback';

    if (isAvailable()) {
      const aiResult = await generateResponse(prompt);

      if (aiResult.success) {
        const validation = validateResponse(aiResult.text);
        insightsText = validation.filtered;
        source = 'ai';
      } else {
        insightsText = getFallbackInsights(analyticsData);
        source = 'fallback';
      }
    } else {
      insightsText = getFallbackInsights(analyticsData);
      source = 'fallback';
    }

    // 6. Cache the insights
    setCached(prompt, insightsText);

    // 7. Return response
    return NextResponse.json({
      success: true,
      data: {
        metrics: analyticsData,
        insights: insightsText,
        source,
        cached: false,
      },
    });
  } catch (error) {
    console.error('❌ Analytics API error:', error);
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
 * Fallback insights logic (deterministic)
 */
function getFallbackInsights(data: any): string {
  const insights: string[] = [];

  // Fleet utilization insight
  const utilization = parseFloat(data.utilizationRate);
  if (utilization > 80) {
    insights.push(
      `🚗 **High Fleet Utilization (${data.utilizationRate}%)**: Your fleet is operating at high capacity. Consider expanding your vehicle inventory to meet demand.`
    );
  } else if (utilization < 30) {
    insights.push(
      `⚠️ **Low Fleet Utilization (${data.utilizationRate}%)**: Many vehicles are unused. Focus on marketing and promotions to increase rental bookings.`
    );
  } else {
    insights.push(
      `✅ **Healthy Fleet Utilization (${data.utilizationRate}%)**: Your fleet is balanced with good availability and decent utilization.`
    );
  }

  // Customer satisfaction insight
  const rating = parseFloat(data.avgRating);
  if (!isNaN(rating)) {
    if (rating >= 4.5) {
      insights.push(
        `⭐ **Excellent Customer Satisfaction (${data.avgRating}/5.0)**: Customers love your service! Maintain this quality to drive repeat business and referrals.`
      );
    } else if (rating < 3.5) {
      insights.push(
        `⚠️ **Low Customer Satisfaction (${data.avgRating}/5.0)**: Address customer concerns urgently. Review feedback to identify improvement areas.`
      );
    } else {
      insights.push(
        `👍 **Good Customer Satisfaction (${data.avgRating}/5.0)** - Solid ratings. Review feedback for specific improvement opportunities.`
      );
    }
  }

  // Revenue insight
  const revenue = parseFloat(data.totalRevenue);
  if (revenue > 0) {
    const avgRevenuePerRental = data.completedRentals > 0
      ? (revenue / data.completedRentals).toFixed(2)
      : '0';
    insights.push(
      `💰 **Revenue Performance**: Total revenue of $${data.totalRevenue} from ${data.completedRentals} completed rentals (avg $${avgRevenuePerRental} per rental).`
    );
  }

  // Active rentals insight
  if (data.activeRentals > data.totalVehicles * 0.7) {
    insights.push(
      `📈 **Peak Demand**: ${data.activeRentals} active rentals indicate high demand. Ensure timely vehicle maintenance and customer service.`
    );
  }

  // Feedback collection insight
  const feedbackRate = data.completedRentals > 0
    ? ((data.feedbackCount / data.completedRentals) * 100).toFixed(1)
    : '0';
  if (parseFloat(feedbackRate) < 50) {
    insights.push(
      `📝 **Low Feedback Rate (${feedbackRate}%)**: Only ${data.feedbackCount} feedback from ${data.completedRentals} completed rentals. Encourage customers to share reviews.`
    );
  }

  return insights.join('\n\n');
}
