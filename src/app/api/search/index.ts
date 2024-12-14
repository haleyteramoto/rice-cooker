import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, query } = req.query;

  if (!type || !query) {
    return res.status(400).json({ error: 'Type and query parameters are required.' });
  }

  try {
    let filteredRecipes;

    if (type === 'ingredients') {
      filteredRecipes = await prisma.recipe.findMany({
        where: {
          ingredients: {
            contains: query.toString(),
            mode: 'insensitive',
          },
        },
      });
    } else if (type === 'cuisine') {
      filteredRecipes = await prisma.recipe.findMany({
        where: {
          cuisine: {
            contains: query.toString(),
            mode: 'insensitive',
          },
        },
      });
    } else if (type === 'dietary') {
      filteredRecipes = await prisma.recipe.findMany({
        where: {
          dietary: {
            contains: query.toString(),
            mode: 'insensitive',
          },
        },
      });
    } else {
      return res.status(400).json({ error: 'Invalid search type.' });
    }

    if (!filteredRecipes || filteredRecipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found.' });
    }

    return res.status(200).json(filteredRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return res.status(500).json({ error: 'An error occurred while fetching recipes.' });
  } finally {
    await prisma.$disconnect();
  }
}
