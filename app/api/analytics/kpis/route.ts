import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/middleware/auth';
import { getKPISummary } from '@/lib/analytics';

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

    // 2. Parse query parameters for date filtering
    const { searchParams } = new URL(request.url);
    const startDateStr = searchParams.get('startDate');
    const endDateStr = searchParams.get('endDate');

    let startDate: Date | undefined;
    let endDate: Date | undefined;

    if (startDateStr) {
      startDate = new Date(startDateStr);
      if (isNaN(startDate.getTime())) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_DATE',
              message: 'Invalid startDate format',
            },
          },
          { status: 400 }
        );
      }
    }

    if (endDateStr) {
      endDate = new Date(endDateStr);
      if (isNaN(endDate.getTime())) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_DATE',
              message: 'Invalid endDate format',
            },
          },
          { status: 400 }
        );
      }
    }

    // 3. Get KPI summary
    const kpis = await getKPISummary(startDate, endDate);

    // 4. Return response
    return NextResponse.json({
      success: true,
      data: {
        kpis,
        dateRange: {
          startDate: startDate?.toISOString() || null,
          endDate: endDate?.toISOString() || null,
        },
      },
    });
  } catch (error) {
    console.error('❌ KPIs API error:', error);
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
