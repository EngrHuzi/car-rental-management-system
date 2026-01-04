import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/middleware/auth';
import {
  getRevenueTrend,
  getUtilizationTrend,
  getSatisfactionTrend,
} from '@/lib/analytics';

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

    // 2. Parse query parameters
    const { searchParams } = new URL(request.url);
    const daysParam = searchParams.get('days');
    const days = daysParam ? parseInt(daysParam, 10) : 30;

    if (isNaN(days) || days < 1 || days > 365) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_DAYS',
            message: 'Days parameter must be between 1 and 365',
          },
        },
        { status: 400 }
      );
    }

    // 3. Get trend data in parallel
    const [revenueTrend, utilizationTrend, satisfactionTrend] = await Promise.all([
      getRevenueTrend(days),
      getUtilizationTrend(days),
      getSatisfactionTrend(days),
    ]);

    // 4. Return response
    return NextResponse.json({
      success: true,
      data: {
        trends: {
          revenue: revenueTrend,
          utilization: utilizationTrend,
          satisfaction: satisfactionTrend,
        },
        period: {
          days,
          startDate: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date().toISOString(),
        },
      },
    });
  } catch (error) {
    console.error('❌ Trends API error:', error);
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
