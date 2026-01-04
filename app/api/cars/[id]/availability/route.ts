import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse } from '@/lib/middleware/auth';
import prisma from '@/lib/prisma';

// PATCH /api/cars/[id]/availability - Toggle vehicle availability
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const { id } = await params;

    // Check if vehicle exists
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Vehicle not found',
          },
        },
        { status: 404 }
      );
    }

    // Toggle availability
    const updated = await prisma.vehicle.update({
      where: { id },
      data: {
        isAvailable: !vehicle.isAvailable,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...updated,
        dailyPrice: Number(updated.dailyPrice),
      },
    });
  } catch (error) {
    console.error('Toggle availability error:', error);
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
