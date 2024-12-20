'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Col, Container, Row, Form, Button, Card } from 'react-bootstrap';
import Image from 'next/image';

const HomePage = () => {
  const router = useRouter();
  const [searchType, setSearchType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]); // state for storing recipes

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
    setSearchQuery(''); // Reset search query when type changes
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from submitting normally

    if (!searchType || !searchQuery) {
      alert('Please select a search type and enter a query.');
      return;
    }

    try {
      const response = await fetch(`/api/search?type=${searchType}&query=${searchQuery}`);
      if (!response.ok) throw new Error('Failed to fetch recipes');
      const recipesData = await response.json();
      if (recipesData.length === 0) {
        alert('No recipes found.');
      } else {
        setRecipes(recipesData); // set recipes data to state
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message); // Safe to access 'message' since it's an Error object
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

  return (
    <main>
      {/* Header section with search */}
      <section
        className="py-5 text-center"
        style={{
          backgroundImage: 'url(\'/landingpage.jpg\')',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <h1 className="mb-4">Search Recipes by Your Preferences</h1>
              <h5 className="mb-4">
                Whether it&apos;s ingredients, cuisine, or dietary preferences, start your search here!
              </h5>
              <Form onSubmit={handleSearch}>
                <Form.Group controlId="searchType" className="mb-3">
                  <Form.Label>Search by:</Form.Label>
                  <Form.Select
                    value={searchType}
                    onChange={handleSearchTypeChange}
                    className="form-control-lg"
                  >
                    <option value="">Choose...</option>
                    <option value="ingredients">Ingredients</option>
                    <option value="cuisine">Cuisine</option>
                    <option value="dietary">Dietary Preferences</option>
                  </Form.Select>
                </Form.Group>
                {searchType && (
                  <Form.Group controlId="searchQuery" className="mb-3">
                    <Form.Label>
                      Enter your
                      {' '}
                      {searchType}
                      :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`Search by ${searchType}...`}
                      value={searchQuery}
                      onChange={handleSearchQueryChange}
                      className="form-control-lg"
                    />
                  </Form.Group>
                )}
                <Button
                  type="submit"
                  size="lg"
                  className="mt-3"
                  disabled={!searchType || !searchQuery}
                >
                  Search Recipes
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Popular recipes section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-4">
            <Col xs={12}>
              <h2>Recipes</h2>
              <p className="lead">Explore some of the recipes based on your search</p>
            </Col>
          </Row>
          <Row className="g-4">
            {(recipes.length > 0 ? recipes : []).map((recipe) => (
              <Col key={recipe.id} xs={12} md={4}>
                <Card className="h-100 shadow-sm">
                  <div style={{ position: 'relative', height: '200px' }}>
                    <Image
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>{recipe.description}</Card.Text>
                    <div className="mb-3">
                      <small className="text-muted">
                        {recipe.cuisine}
                        {' '}
                        •
                        {' '}
                        {recipe.dietary}
                      </small>
                    </div>
                    <Button
                      variant="dark"
                      onClick={() => router.push(`/recipes/${recipe.id}`)}
                    >
                      View Recipe
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default HomePage;
