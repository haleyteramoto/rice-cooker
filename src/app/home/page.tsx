'use client';

import { useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import RecipeCard from '@/components/RecipeCard';

const HomePage = () => {
  const [searchType, setSearchType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]);

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
    setSearchQuery(''); // Reset search query when type changes
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchType || !searchQuery) {
      alert('Please select a search type and enter a query.');
      return;
    }

    try {
      const response = await fetch(`/api/search?type=${searchType}&query=${searchQuery}`);
      if (response.status === 404) {
        setRecipes([]);
      } else if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      } else {
        const recipesData = await response.json();
        setRecipes(recipesData);
      }
    } catch (error: unknown) {
      console.error(error instanceof Error ? error.message : 'An unknown error occurred');
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <main>
      {/* Header Section */}
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

      {/* Recipes Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-4">
            <Col xs={12}>
              <h2>Recipes</h2>
              <p className="lead">Explore some of the recipes based on your search</p>
            </Col>
          </Row>
          <Row xs={1} md={2} lg={3} className="g-4">
            {recipes.length > 0
              ? recipes.map((recipe) => (
                <Col key={recipe.id}>
                  <RecipeCard recipe={recipe} />
                </Col>
              ))
              : (
                <Col>
                  <p className="text-center">No recipes found. Please try a different search.</p>
                </Col>
              )}
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default HomePage;
