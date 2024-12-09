// pages/api/recipes/add.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description, ingredients, cuisine, dietary, imageUrl, link } = req.body;

    // Validate the request body
    if (!title || !description || !ingredients || !cuisine || !dietary || !imageUrl || !link) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Create the recipe in the database using Prisma
      const newRecipe = await prisma.recipe.create({
        data: {
          title,
          description,
          ingredients,
          cuisine,
          dietary,
          imageUrl,
          link,
        },
      });

      // Return the newly created recipe
      return res.status(201).json(newRecipe);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to add recipe' });
    }
  } else {
    // If not a POST request, return 405 Method Not Allowed
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
