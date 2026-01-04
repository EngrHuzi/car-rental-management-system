import { NextRequest, NextResponse } from 'next/server';
import { createCustomerSchema } from '@/lib/validations/customer';
import { authenticateRequest, unauthorizedResponse } from '@/lib/middleware/auth';
import prisma from '@/lib/prisma';

// GET /api/customers - List all customers
export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const includeDeleted = searchParams.get('includeDeleted') === 'true';

    // Build where clause
    const where: any = {};

    // Exclude soft-deleted customers by default
    if (!includeDeleted) {
      where.isDeleted = false;
    }

    // Search by name or email
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const customers = await prisma.customer.findMany({
      where,
      orderBy: [{ name: 'asc' }],
      include: {
        _count: {
          select: { rentals: true },
        },
      },
    });

    // Get metadata
    const total = await prisma.customer.count({ where: { isDeleted: false } });
    const deleted = await prisma.customer.count({ where: { isDeleted: true } });

    return NextResponse.json({
      success: true,
      data: customers,
      meta: {
        total,
        active: total,
        deleted,
      },
    });
  } catch (error) {
    console.error('List customers error:', error);
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

// POST /api/customers - Create new customer
export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const validationResult = createCustomerSchema.safeParse(body);

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

    const { name, email, phone } = validationResult.data;

    // Check for duplicate email
    const existing = await prisma.customer.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DUPLICATE_EMAIL',
            message: `A customer with email "${email}" already exists`,
          },
        },
        { status: 409 }
      );
    }

    // Create customer
    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
      },
      include: {
        _count: {
          select: { rentals: true },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: customer,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create customer error:', error);
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
