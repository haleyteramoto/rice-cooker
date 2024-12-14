/* eslint-disable import/prefer-default-export */
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Extract query parameters
    const type = req.nextUrl.searchParams.get('type');
    const query = req.nextUrl.searchParams.get('query');

    // Check if both type and query are provided
    if (!type || !query) {
      return NextResponse.json({ error: 'Type and query parameters are required.' }, { status: 400 });
    }

    let filteredRecipes;

    // Handle different search types
    switch (type) {
      case 'ingredients':
        filteredRecipes = await prisma.recipe.findMany({
          where: {
            ingredients: {
              contains: query,
              mode: 'insensitive',
            },
          },
        });
        break;

      case 'cuisine':
        filteredRecipes = await prisma.recipe.findMany({
          where: {
            cuisine: {
              contains: query,
              mode: 'insensitive',
            },
          },
        });
        break;

      case 'dietary':
        filteredRecipes = await prisma.recipe.findMany({
          where: {
            dietary: {
              contains: query,
              mode: 'insensitive',
            },
          },
        });
        break;

      default:
        return NextResponse.json({ error: 'Invalid search type.' }, { status: 400 });
    }

    // Return the filtered recipes
    return NextResponse.json(filteredRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'An error occurred while fetching recipes.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
