'use client';

import { Recipe } from '@/lib/validationSchemas';
import { Button, Card, Image } from 'react-bootstrap';
// import Link from 'next/link';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <Card className="h-100 shadow-sm">
    <div style={{ position: 'relative', height: '200px', width: '100%' }}>
      <Image
        src={recipe.imageUrl}
        alt={recipe.title}
        fluid
        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
      />
    </div>
    <Card.Body>
      <Card.Title>{recipe.title}</Card.Title>
      <Card.Text>{recipe.description}</Card.Text>
      <div className="mb-3">
        <small className="text-muted">
          {recipe.cuisine}
        </small>
        <br />
        <small className="text-muted">
          {Array.isArray(recipe.dietary) ? recipe.dietary.join(', ') : recipe.dietary}
        </small>
      </div>
      <Button href="/recipes" className="btn-dark" type="button">
        View Recipe
      </Button>
    </Card.Body>
  </Card>
);

export default RecipeCard;
