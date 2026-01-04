import { NextRequest, NextResponse } from 'next/server';
import { updateVehicleSchema } from '@/lib/validations/vehicle';
import { authenticateRequest, unauthorizedResponse } from '@/lib/middleware/auth';
import prisma from '@/lib/prisma';

// GET /api/cars/[id] - Get vehicle by ID
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

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        rentals: {
          select: {
            id: true,
            status: true,
            startDate: true,
            endDate: true,
          },
        },
      },
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

    return NextResponse.json({
      success: true,
      data: {
        ...vehicle,
        dailyPrice: Number(vehicle.dailyPrice),
      },
    });
  } catch (error) {
    console.error('Get vehicle error:', error);
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

// PUT /api/cars/[id] - Update vehicle
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
    const validationResult = updateVehicleSchema.safeParse(body);

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

    // Check if vehicle exists
    const existing = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!existing) {
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

    // Check for duplicate if model or brand is being updated
    const { model, brand, dailyPrice } = validationResult.data;
    const newModel = model || existing.model;
    const newBrand = brand || existing.brand;

    if (model || brand) {
      const duplicate = await prisma.vehicle.findFirst({
        where: {
          AND: [
            { model: newModel },
            { brand: newBrand },
            { NOT: { id } },
          ],
        },
      });

      if (duplicate) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'DUPLICATE_VEHICLE',
              message: `A vehicle with model "${newModel}" and brand "${newBrand}" already exists`,
            },
          },
          { status: 409 }
        );
      }
    }

    // Update vehicle
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        ...(model && { model }),
        ...(brand && { brand }),
        ...(dailyPrice !== undefined && { dailyPrice }),
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...vehicle,
        dailyPrice: Number(vehicle.dailyPrice),
      },
    });
  } catch (error) {
    console.error('Update vehicle error:', error);
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

// DELETE /api/cars/[id] - Delete vehicle (only if no rentals)
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

    // Check if vehicle exists
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        rentals: true,
      },
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

    // Check if vehicle has any rentals
    if (vehicle.rentals.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VEHICLE_HAS_RENTALS',
            message: 'Cannot delete vehicle with rental history',
          },
        },
        { status: 409 }
      );
    }

    // Delete vehicle
    await prisma.vehicle.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Vehicle deleted successfully',
    });
  } catch (error) {
    console.error('Delete vehicle error:', error);
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
