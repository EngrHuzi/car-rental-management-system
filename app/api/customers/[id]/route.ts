import { NextRequest, NextResponse } from 'next/server';
import { updateCustomerSchema } from '@/lib/validations/customer';
import { authenticateRequest, unauthorizedResponse } from '@/lib/middleware/auth';
import prisma from '@/lib/prisma';

// GET /api/customers/[id] - Get customer by ID
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

    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        rentals: {
          select: {
            id: true,
            status: true,
            startDate: true,
            endDate: true,
            totalCost: true,
            vehicle: {
              select: {
                id: true,
                brand: true,
                model: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: { rentals: true },
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Customer not found',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...customer,
        rentals: customer.rentals.map((rental) => ({
          ...rental,
          totalCost: Number(rental.totalCost),
        })),
      },
    });
  } catch (error) {
    console.error('Get customer error:', error);
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

// PUT /api/customers/[id] - Update customer
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
    const validationResult = updateCustomerSchema.safeParse(body);

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

    // Check if customer exists
    const existing = await prisma.customer.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Customer not found',
          },
        },
        { status: 404 }
      );
    }

    // Check for duplicate email if email is being updated
    const { name, email, phone } = validationResult.data;

    if (email && email !== existing.email) {
      const duplicate = await prisma.customer.findUnique({
        where: { email },
      });

      if (duplicate) {
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
    }

    // Update customer
    const customer = await prisma.customer.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone !== undefined && { phone }),
      },
      include: {
        _count: {
          select: { rentals: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error('Update customer error:', error);
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

// DELETE /api/customers/[id] - Delete customer (soft or hard delete based on rental history)
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

    // Check if customer exists
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        rentals: true,
      },
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Customer not found',
          },
        },
        { status: 404 }
      );
    }

    // If customer has rental history, perform soft delete
    if (customer.rentals.length > 0) {
      await prisma.customer.update({
        where: { id },
        data: {
          isDeleted: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Customer soft deleted (has rental history)',
        deletionType: 'soft',
      });
    }

    // No rental history - perform hard delete
    await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Customer deleted successfully',
      deletionType: 'hard',
    });
  } catch (error) {
    console.error('Delete customer error:', error);
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
