import NextAuth from 'next-auth';
import authOptions from '@/lib/authOptions';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

const handler = NextAuth(authOptions);

// Handle GET requests
async function handleSearch(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get('q');

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

export async function GET(req: NextRequest) {
  if (req.nextUrl.pathname === '/api/search') {
    return handleSearch(req);
  }
  return handler(req);
}

export async function POST(req: NextRequest) {
  return handler(req);
}
