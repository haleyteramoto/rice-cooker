'use client';

import { Recipe } from '@/lib/validationSchemas';
import { Card, Image } from 'react-bootstrap';
// import Link from 'next/link';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <Card className="h-300">
    <Card.Header className="text-center">
      <Card.Title>
        <strong>{recipe.name}</strong>
      </Card.Title>
      <Image src={recipe.image} height={150} className="mx-auto mb-3" />
      <Card.Subtitle>
        By
        {recipe.author}
      </Card.Subtitle>
    </Card.Header>
  </Card>
);

export default RecipeCard;
