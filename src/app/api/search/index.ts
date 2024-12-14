// /api/search/index.ts
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import authOptions from '@/lib/authOptions';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'You must be logged in to search for recipes.' });
  }

  const { type, query } = req.query;
  if (!type || !query) {
    return res.status(400).json({ error: 'Type and query parameters are required.' });
  }

  try {
    let filteredRecipes;

    switch (type) {
      case 'ingredients':
        filteredRecipes = await prisma.recipe.findMany({
          where: {
            ingredients: {
              contains: query.toString(),
              mode: 'insensitive',
            },
          },
        });
        break;

      case 'cuisine':
        filteredRecipes = await prisma.recipe.findMany({
          where: {
            cuisine: {
              contains: query.toString(),
              mode: 'insensitive',
            },
          },
        });
        break;

      case 'dietary':
        filteredRecipes = await prisma.recipe.findMany({
          where: {
            dietary: {
              contains: query.toString(),
              mode: 'insensitive',
            },
          },
        });
        break;

      default:
        return res.status(400).json({ error: 'Invalid search type.' });
    }

    return res.status(200).json(filteredRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return res.status(500).json({ error: 'An error occurred while fetching recipes.' });
  } finally {
    await prisma.$disconnect();
  }
}
