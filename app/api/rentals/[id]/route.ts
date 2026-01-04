import { NextRequest, NextResponse } from 'next/server';
import { updateRentalSchema } from '@/lib/validations/rental';
import { authenticateRequest, unauthorizedResponse } from '@/lib/middleware/auth';
import prisma from '@/lib/prisma';

// GET /api/rentals/[id] - Get rental by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const { id } = await params;

    const rental = await prisma.rental.findUnique({
      where: { id },
      include: {
        vehicle: {
          select: {
            id: true,
            brand: true,
            model: true,
            dailyPrice: true,
            isAvailable: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!rental) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Rental not found',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...rental,
        totalCost: Number(rental.totalCost),
        vehicle: {
          ...rental.vehicle,
          dailyPrice: Number(rental.vehicle.dailyPrice),
        },
      },
    });
  } catch (error) {
    console.error('Get rental error:', error);
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

// PUT /api/rentals/[id] - Update rental
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const { id } = await params;

    const body = await request.json();
    const validationResult = updateRentalSchema.safeParse(body);

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

    // Check if rental exists
    const existing = await prisma.rental.findUnique({
      where: { id },
      include: {
        vehicle: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Rental not found',
          },
        },
        { status: 404 }
      );
    }

    // Only allow updates to active rentals
    if (existing.status !== 'active') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RENTAL_NOT_ACTIVE',
            message: 'Can only update active rentals',
          },
        },
        { status: 400 }
      );
    }

    const { startDate, endDate, status } = validationResult.data;

    // Validate dates if being updated
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : existing.startDate;
      const end = endDate ? new Date(endDate) : existing.endDate;

      if (end <= start) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_DATES',
              message: 'End date must be after start date',
            },
          },
          { status: 400 }
        );
      }

      // Recalculate total cost if dates changed
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const totalCost = days * Number(existing.vehicle.dailyPrice);

      const rental = await prisma.rental.update({
        where: { id },
        data: {
          ...(startDate && { startDate: new Date(startDate) }),
          ...(endDate && { endDate: new Date(endDate) }),
          ...(status && { status }),
          totalCost,
        },
        include: {
          vehicle: {
            select: {
              id: true,
              brand: true,
              model: true,
              dailyPrice: true,
            },
          },
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        data: {
          ...rental,
          totalCost: Number(rental.totalCost),
          vehicle: {
            ...rental.vehicle,
            dailyPrice: Number(rental.vehicle.dailyPrice),
          },
        },
      });
    }

    // Update status only
    const rental = await prisma.rental.update({
      where: { id },
      data: {
        ...(status && { status }),
      },
      include: {
        vehicle: {
          select: {
            id: true,
            brand: true,
            model: true,
            dailyPrice: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...rental,
        totalCost: Number(rental.totalCost),
        vehicle: {
          ...rental.vehicle,
          dailyPrice: Number(rental.vehicle.dailyPrice),
        },
      },
    });
  } catch (error) {
    console.error('Update rental error:', error);
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

// DELETE /api/rentals/[id] - Cancel rental
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const { id } = await params;

    // Check if rental exists
    const rental = await prisma.rental.findUnique({
      where: { id },
    });

    if (!rental) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Rental not found',
          },
        },
        { status: 404 }
      );
    }

    // Only allow cancellation of active rentals
    if (rental.status !== 'active') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RENTAL_NOT_ACTIVE',
            message: 'Can only cancel active rentals',
          },
        },
        { status: 400 }
      );
    }

    // Update rental status to canceled and free the vehicle in a transaction
    await prisma.$transaction(async (tx) => {
      // Cancel rental
      await tx.rental.update({
        where: { id },
        data: { status: 'canceled' },
      });

      // Free the vehicle
      await tx.vehicle.update({
        where: { id: rental.vehicleId },
        data: { isAvailable: true },
      });
    });

    return NextResponse.json({
      success: true,
      message: 'Rental cancelled successfully',
    });
  } catch (error) {
    console.error('Cancel rental error:', error);
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
