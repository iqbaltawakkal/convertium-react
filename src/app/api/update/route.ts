import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function POST(request: Request) {
    const body = await request.json();
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value || '';

    console.log(body)

    try {
        // Verify the token
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: number };

        const updateUser = await prisma.user.update({
            where: { id: payload.userId },
            data: body,
        })

        console.log(updateUser)
        if (!updateUser) throw Error;

        return NextResponse.json({ message: 'Update successful' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ statusCode: 500, message: 'User update failed' });
    }
}
