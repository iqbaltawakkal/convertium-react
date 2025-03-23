import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // Validate input
  if (!email || !password) {
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
      firstName: '',
      lastName: '',
      salutation: '',
      address: '',
      country: '',
      postalCode: '',
      dateOfBirth: '',
      gender: '',
      maritalStatus: '',
      spouseFirstName: '',
      spouseLastName: '',
      spouseSalutation: '',
      hobbiesInterests: '',
      favoriteSport: '',
      preferredMusic: '',
      preferredMovie: '',
    },
  });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key');
  // Set HTTP-only cookie
  const response = NextResponse.json({ message: 'Registration successful' }, { status: 200 });
  response.cookies.set('auth_token', token, {
    httpOnly: true,
    maxAge: 2 * 60 * 60,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return response
}