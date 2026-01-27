import { NextResponse } from 'next/server';
import { authenticateToken } from '@/lib/middleware/authMiddleware';

export async function GET(req) {
  try {
    const auth = authenticateToken(req);

    if (!auth.success) {
      return NextResponse.json(
        {
          success: false,
          message: auth.error,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Token is valid',
        data: {
          user: auth.user,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Token verification failed',
      },
      { status: 403 }
    );
  }
}
