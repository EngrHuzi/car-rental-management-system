import { NextRequest, NextResponse } from 'next/server';
import { createRentalSchema } from '@/lib/validations/rental';
import { authenticateRequest, unauthorizedResponse } from '@/lib/middleware/auth';
import prisma from '@/lib/prisma';

// GET /api/rentals - List all rentals
export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const vehicleId = searchParams.get('vehicleId');
    const customerId = searchParams.get('customerId');

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (vehicleId) {
      where.vehicleId = vehicleId;
    }

    if (customerId) {
      where.customerId = customerId;
    }

    const rentals = await prisma.rental.findMany({
      where,
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
      orderBy: [{ createdAt: 'desc' }],
    });

    // Get metadata
    const total = await prisma.rental.count();
    const active = await prisma.rental.count({ where: { status: 'active' } });
    const completed = await prisma.rental.count({ where: { status: 'completed' } });
    const cancelled = await prisma.rental.count({ where: { status: 'canceled' } });

    return NextResponse.json({
      success: true,
      data: rentals.map((rental) => ({
        ...rental,
        totalCost: Number(rental.totalCost),
        vehicle: {
          ...rental.vehicle,
          dailyPrice: Number(rental.vehicle.dailyPrice),
        },
      })),
      meta: {
        total,
        active,
        completed,
        cancelled,
      },
    });
  } catch (error) {
    console.error('List rentals error:', error);
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

// POST /api/rentals - Create new rental
export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const validationResult = createRentalSchema.safeParse(body);

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

    const { vehicleId, customerId, startDate, endDate } = validationResult.data;

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

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

    // Check if vehicle exists and is available
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VEHICLE_NOT_FOUND',
            message: 'Vehicle not found',
          },
        },
        { status: 404 }
      );
    }

    if (!vehicle.isAvailable) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VEHICLE_UNAVAILABLE',
            message: 'Vehicle is not available for rental',
          },
        },
        { status: 409 }
      );
    }

    // Check if customer exists
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CUSTOMER_NOT_FOUND',
            message: 'Customer not found',
          },
        },
        { status: 404 }
      );
    }

    if (customer.isDeleted) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CUSTOMER_DELETED',
            message: 'Cannot create rental for deleted customer',
          },
        },
        { status: 400 }
      );
    }

    // Calculate total cost: (days) * dailyPrice
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalCost = days * Number(vehicle.dailyPrice);

    // Create rental and update vehicle availability in a transaction
    const rental = await prisma.$transaction(async (tx) => {
      // Create rental
      const newRental = await tx.rental.create({
        data: {
          vehicleId,
          customerId,
          startDate: start,
          endDate: end,
          totalCost,
          status: 'active',
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

      // Update vehicle availability
      await tx.vehicle.update({
        where: { id: vehicleId },
        data: { isAvailable: false },
      });

      return newRental;
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          ...rental,
          totalCost: Number(rental.totalCost),
          vehicle: {
            ...rental.vehicle,
            dailyPrice: Number(rental.vehicle.dailyPrice),
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create rental error:', error);
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
