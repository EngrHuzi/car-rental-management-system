import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse } from '@/lib/middleware/auth';
import prisma from '@/lib/prisma';

// GET /api/feedback/stats - Get aggregated feedback statistics
export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    // Get all feedback
    const allFeedback = await prisma.feedback.findMany({
      select: {
        rating: true,
      },
    });

    const totalFeedback = allFeedback.length;

    if (totalFeedback === 0) {
      return NextResponse.json({
        success: true,
        data: {
          totalFeedback: 0,
          averageRating: 0,
          ratingDistribution: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          },
        },
      });
    }

    // Calculate average rating
    const totalRating = allFeedback.reduce((sum, fb) => sum + fb.rating, 0);
    const averageRating = totalRating / totalFeedback;

    // Calculate rating distribution
    const ratingDistribution: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    allFeedback.forEach((fb) => {
      ratingDistribution[fb.rating]++;
    });

    // Calculate satisfaction rate (percentage of 4 and 5 star ratings)
    const satisfiedCount = ratingDistribution[4] + ratingDistribution[5];
    const satisfactionRate = (satisfiedCount / totalFeedback) * 100;

    return NextResponse.json({
      success: true,
      data: {
        totalFeedback,
        averageRating: Math.round(averageRating * 100) / 100,
        satisfactionRate: Math.round(satisfactionRate * 100) / 100,
        ratingDistribution,
      },
    });
  } catch (error) {
    console.error('Get feedback stats error:', error);
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
