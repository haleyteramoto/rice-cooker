import NextAuth from 'next-auth';
import authOptions from '@/lib/authOptions';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// NextAuth handler for authentication
const authHandler = NextAuth(authOptions);

// Custom handler for search functionality
async function handleSearch(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get('q'); // Extract query parameter

  if (!query) {
    return NextResponse.json({ message: 'No query provided' }, { status: 400 });
  }

  try {
    const results = await prisma.stuff.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    return NextResponse.json(results);
  } catch (error: unknown) {
    // Handle error safely
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Error searching for items', error: error.message },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { message: 'Unknown error occurred', error: 'An unknown error occurred' },
      { status: 500 },
    );
  }
}

// Main GET handler: Route requests to the appropriate functionality
export async function GET(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/api/search') {
    return handleSearch(req); // Delegate to search logic
  }

  if (pathname.startsWith('/api/auth')) {
    return authHandler(req); // Delegate to NextAuth
  }

  return NextResponse.json({ message: 'Endpoint not found' }, { status: 404 });
}

// Main POST handler: Forward requests to NextAuth
export async function POST(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/auth')) {
    return authHandler(req);
  }

  return NextResponse.json({ message: 'POST not supported for this endpoint' }, { status: 405 });
}
