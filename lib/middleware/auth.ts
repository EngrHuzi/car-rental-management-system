import { NextRequest } from 'next/server';
import { verifyToken } from '../auth';
import prisma from '../prisma';
import { User } from '@/types/auth';

/**
 * Authenticate a request by validating the JWT token and checking the session
 * @param request Next.js request object
 * @returns Authenticated user object or null if authentication fails
 */
export async function authenticateRequest(
  request: NextRequest
): Promise<User | null> {
  // 1. Extract token from Authorization header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);

  // 2. Verify JWT token
  const payload = verifyToken(token);
  if (!payload) {
    return null; // Invalid or expired JWT
  }

  // 3. Validate session in database
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) {
    return null; // Session not found
  }

  // 4. Check expiration
  if (new Date() > session.expiresAt) {
    // Session expired - clean up
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }

  // 5. Return authenticated user (exclude password)
  const { password, ...userWithoutPassword } = session.user;
  return userWithoutPassword as User;
}

/**
 * Verify authentication and return result
 * @param request Next.js request object
 * @returns Object with valid flag and optional user data
 */
export async function verifyAuth(
  request: NextRequest
): Promise<{ valid: boolean; user?: User }> {
  const user = await authenticateRequest(request);
  if (!user) {
    return { valid: false };
  }
  return { valid: true, user };
}

/**
 * Error response helper for unauthorized requests
 */
export function unauthorizedResponse() {
  return Response.json(
    {
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
      },
    },
    { status: 401 }
  );
}
