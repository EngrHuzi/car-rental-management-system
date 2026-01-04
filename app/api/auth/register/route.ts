import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { registerSchema } from '@/lib/validations/auth';
import { hashPassword } from '@/lib/auth';
import { sendEmail, generateVerificationEmail } from '@/lib/email/mailer';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate request body
    const body = await request.json();
    const validationResult = registerSchema.safeParse(body);

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

    // 2. Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'EMAIL_EXISTS',
            message: 'An account with this email already exists',
          },
        },
        { status: 409 }
      );
    }

    // 3. Hash password
    const hashedPassword = await hashPassword(password);

    // 4. Generate verification token
    const verificationToken = randomUUID();
    const verificationExpires = new Date();
    verificationExpires.setHours(verificationExpires.getHours() + 24); // 24 hours

    // 5. Create user with verification token
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        emailVerified: false,
        verificationToken,
        verificationExpires,
      },
    });

    // 6. Send verification email
    const emailHtml = generateVerificationEmail(email.split('@')[0], verificationToken);
    const emailSent = await sendEmail({
      to: email,
      subject: 'Verify Your Email - Car Rental Management',
      html: emailHtml,
      text: `Please verify your email by visiting: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`,
    });

    if (!emailSent) {
      console.error('Failed to send verification email to:', email);
      // Continue anyway - user can request new verification email later
    }

    // 7. Return success response (do not create session yet - user must verify email first)
    return NextResponse.json(
      {
        success: true,
        data: {
          message: 'Account created successfully. Please check your email to verify your account.',
          email: user.email,
          requiresVerification: true,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
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
