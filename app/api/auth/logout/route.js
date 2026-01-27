import { NextResponse } from 'next/server';
import { authenticateToken } from '@/lib/middleware/authMiddleware';

export async function POST(req) {
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
        message: 'Logout successful',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Logout failed',
      },
      { status: 500 }
    );
  }
}
