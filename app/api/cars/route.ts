import { NextRequest, NextResponse } from 'next/server';
import { createVehicleSchema } from '@/lib/validations/vehicle';
import { authenticateRequest, unauthorizedResponse } from '@/lib/middleware/auth';
import prisma from '@/lib/prisma';

// GET /api/cars - List all vehicles with optional filters
export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const availableParam = searchParams.get('available');
    const brand = searchParams.get('brand');

    // Build filter object
    const where: any = {};
    if (availableParam !== null) {
      where.isAvailable = availableParam === 'true';
    }
    if (brand) {
      where.brand = brand;
    }

    // Fetch vehicles with filters
    const vehicles = await prisma.vehicle.findMany({
      where,
      orderBy: [
        { brand: 'asc' },
        { model: 'asc' },
      ],
    });

    // Calculate metadata
    const total = vehicles.length;
    const available = vehicles.filter(v => v.isAvailable).length;
    const unavailable = total - available;

    return NextResponse.json({
      success: true,
      data: vehicles.map(v => ({
        ...v,
        dailyPrice: Number(v.dailyPrice),
      })),
      meta: {
        total,
        available,
        unavailable,
      },
    });
  } catch (error) {
    console.error('Get vehicles error:', error);
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

// POST /api/cars - Create a new vehicle
export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const validationResult = createVehicleSchema.safeParse(body);

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

    const { model, brand, dailyPrice } = validationResult.data;

    // Check for duplicate (model + brand combination)
    const existing = await prisma.vehicle.findUnique({
      where: {
        model_brand: {
          model,
          brand,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DUPLICATE_VEHICLE',
            message: `A vehicle with model "${model}" and brand "${brand}" already exists`,
          },
        },
        { status: 409 }
      );
    }

    // Create vehicle
    const vehicle = await prisma.vehicle.create({
      data: {
        model,
        brand,
        dailyPrice,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          ...vehicle,
          dailyPrice: Number(vehicle.dailyPrice),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create vehicle error:', error);
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
