import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { generateToken } from '@/lib/utils/jwt';
import { handleError } from '@/lib/middleware/errorHandler';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

export async function POST(req) {
  try {
    await connectDB();

    const { username, password } = await req.json();

 
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Username and password are required',
        },
        { status: 400 }
      );
    }

  
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid credentials',
        },
        { status: 401 }
      );
    }


    const token = generateToken({
      id: '1',
      username: ADMIN_USERNAME,
      role: 'admin',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: {
            username: ADMIN_USERNAME,
            role: 'admin',
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}
