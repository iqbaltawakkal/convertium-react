import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, firstName, lastName, salutation } = body;

  // Validate input
  if (!email || !password || !firstName || !lastName || !salutation) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  // Check if user already exists
  const userExists = await prisma.user.findUnique({
    where: { email },
  });
  if (userExists) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create new user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      salutation,
    },
  });

  return NextResponse.json({ message: 'Registration successful' }, { status: 201 });
}