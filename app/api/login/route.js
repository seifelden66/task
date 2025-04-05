import { NextResponse } from 'next/server';
import { findUser } from '@/app/lib/users';
import { getUsers } from '../../lib/users';

// Fallback demo user
const DEMO_USER = {
    email: "demo@example.com",
    password: "demo123"
};

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate the input
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // First try to find registered user
        const registeredUser = findUser(email);

        // Check if it's a registered user or demo user
        const isValidUser =
            (registeredUser && registeredUser.password === password) ||
            (email === DEMO_USER.email && password === DEMO_USER.password);

        if (!isValidUser) {
            console.log('All users:', getUsers());  // Debug log to see all users

            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // If credentials are correct, create the response
        const response = NextResponse.json(
            {
                message: 'Login successful',
                user: { email }
            },
            { status: 200 }
        );

        // Set authentication cookie
        response.cookies.set({
            name: 'auth_token',
            value: 'your_jwt_token_here',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
} 