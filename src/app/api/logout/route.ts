import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
  const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
  response.cookies.delete('auth_token');
  return response;
}