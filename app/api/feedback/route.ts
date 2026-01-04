import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authenticateRequest, unauthorizedResponse } from '@/lib/middleware/auth';
import prisma from '@/lib/prisma';

const createFeedbackSchema = z.object({
  rentalId: z.string().uuid('Invalid rental ID format'),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

// GET /api/feedback - List all feedback
export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const rentalId = searchParams.get('rentalId');
    const minRating = searchParams.get('minRating');

    // Build where clause
    const where: any = {};

    if (rentalId) {
      where.rentalId = rentalId;
    }

    if (minRating) {
      where.rating = { gte: parseInt(minRating) };
    }

    const feedback = await prisma.feedback.findMany({
      where,
      include: {
        rental: {
          include: {
            vehicle: {
              select: {
                id: true,
                brand: true,
                model: true,
              },
            },
            customer: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: [{ createdAt: 'desc' }],
    });

    return NextResponse.json({
      success: true,
      data: feedback.map((fb) => ({
        ...fb,
        rental: {
          ...fb.rental,
          totalCost: Number(fb.rental.totalCost),
        },
      })),
    });
  } catch (error) {
    console.error('List feedback error:', error);
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

// POST /api/feedback - Create new feedback
export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const validationResult = createFeedbackSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input data',
            fields: validationResult.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const { rentalId, rating, comment } = validationResult.data;

    // Check if rental exists
    const rental = await prisma.rental.findUnique({
      where: { id: rentalId },
    });

    if (!rental) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RENTAL_NOT_FOUND',
            message: 'Rental not found',
          },
        },
        { status: 404 }
      );
    }

    // Check if feedback already exists for this rental (one-to-one constraint)
    const existingFeedback = await prisma.feedback.findUnique({
      where: { rentalId },
    });

    if (existingFeedback) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DUPLICATE_FEEDBACK',
            message: 'Feedback already exists for this rental',
          },
        },
        { status: 409 }
      );
    }

    // Create feedback
    const feedback = await prisma.feedback.create({
      data: {
        rentalId,
        rating,
        comment,
      },
      include: {
        rental: {
          include: {
            vehicle: {
              select: {
                id: true,
                brand: true,
                model: true,
              },
            },
            customer: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          ...feedback,
          rental: {
            ...feedback.rental,
            totalCost: Number(feedback.rental.totalCost),
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create feedback error:', error);
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
