import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function GET(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value;
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: number };

    // Fetch user from the database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      salutation: user.salutation,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}