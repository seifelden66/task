import { NextResponse } from 'next/server';
import { addUser, findUser } from '@/app/lib/users';

export async function POST(request) {
  
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (findUser(email)) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    const newUser = addUser({ 
      email, 
      password, 
      registeredAt: new Date().toISOString()
    });

    return NextResponse.json(
      { 
        success: true,
        message: 'Registration successful',
        user: { 
          email: newUser.email,
          registeredAt: newUser.registeredAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 