import { NextResponse } from 'next/server';

export async function GET(req) {
  return NextResponse.json(
    {
      success: true,
      message: 'API is running',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
