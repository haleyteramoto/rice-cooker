'use client';

import React from 'react';
import Image from 'next/image';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './recipe.module.css';

interface Ingredient {
  id: string;
  name: string;
  amount: string;
}

interface Instruction {
  id: string;
  step: string;
}

interface RecipeProps {
  title: string;
  image: string;
  cookTime: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  description: string;
  cuisine: string;
  dietaryPreferences: string[];
}

const Recipe: React.FC<RecipeProps> = ({
  title,
  image,
  cookTime,
  servings,
  ingredients,
  instructions,
  description,
  cuisine,
  dietaryPreferences,
}) => (
  <Container className="py-5">
    <Row>
      {/* Recipe Header */}
      <Col xs={12} className="mb-4">
        <h1 className="text-center">{title}</h1>
        <p className="text-center text-muted">{description}</p>
      </Col>
    </Row>

    <Row className="mb-4">
      {/* Recipe Image */}
      <Col xs={12} md={6}>
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className={styles.recipeImage}
        />
      </Col>

      {/* Recipe Details */}
      <Col xs={12} md={6}>
        <div className={styles.recipeDetails}>
          <p>
            <strong>Cook Time:</strong>
            {' '}
            {cookTime}
          </p>
          <p>
            <strong>Servings:</strong>
            {' '}
            {servings}
          </p>
          <p>
            <strong>Cuisine:</strong>
            {' '}
            {cuisine}
          </p>
          {dietaryPreferences.length > 0 && (
          <p>
            <strong>Dietary:</strong>
            {' '}
            {dietaryPreferences.join(', ')}
          </p>
          )}
        </div>
      </Col>
    </Row>

    <Row>
      {/* Ingredients */}
      <Col xs={12} md={4}>
        <h2>Ingredients</h2>
        <ul className={styles.ingredientsList}>
          {ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.amount}
              {' '}
              {ingredient.name}
            </li>
          ))}
        </ul>
      </Col>

      {/* Instructions */}
      <Col xs={12} md={8}>
        <h2>Instructions</h2>
        <ol className={styles.instructionsList}>
          {instructions.map((instruction) => (
            <li key={instruction.id}>{instruction.step}</li>
          ))}
        </ol>
      </Col>
    </Row>

    {/* Action Buttons */}
    <Row className="mt-4">
      <Col xs={12} className="text-center">
        <Button variant="primary" className="me-2">Save Recipe</Button>
        <Button variant="outline-primary">Print Recipe</Button>
      </Col>
    </Row>
  </Container>
);

export default Recipe;
