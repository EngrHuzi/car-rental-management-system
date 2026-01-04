import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/auth';
import { comparePasswords, generateToken, getSessionExpiry } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate request body
    const body = await request.json();
    const validationResult = loginSchema.safeParse(body);

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

    const { email, password } = validationResult.data;

    // 2. Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 3. Verify password (use timing-safe comparison)
    if (!user || !(await comparePasswords(password, user.password))) {
      // Generic error message (don't reveal if email exists)
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        },
        { status: 401 }
      );
    }

    // 4. Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'EMAIL_NOT_VERIFIED',
            message: 'Please verify your email address before logging in. Check your inbox for the verification link.',
          },
        },
        { status: 403 }
      );
    }

    // 5. Generate new JWT token
    const token = generateToken(user.id);
    const expiresAt = getSessionExpiry();

    // 6. Create new session (or update existing)
    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    // 7. Return success response (exclude password)
    return NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
          },
          token,
          expiresAt: expiresAt.toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Login error:', error);
    console.error('❌ Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
          details: process.env.NODE_ENV === 'development'
            ? (error instanceof Error ? error.message : String(error))
            : undefined,
        },
      },
      { status: 500 }
    );
  }
}
