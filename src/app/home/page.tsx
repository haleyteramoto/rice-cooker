'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Col, Container, Row, Form, Button, Card } from 'react-bootstrap';

/** home page */
const HomePage = () => {
  const router = useRouter();
  const [searchType, setSearchType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]); // state for storing recipes

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
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
      <Container
        id="home-page"
        fluid
        className="py-5 text-center"
        style={{
          backgroundImage: 'url(\'/landingpage.jpg\')',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
        }}
      >

        <Container>
          <Row className="justify-content-center">
            <Col xs={12}>
              <h2>Search Recipes by Your Preferences</h2>
              <h5 className="mb-4">
                Whether it&apos;s ingredients, cuisine, or dietary preferences, start your search here!
              </h5>
              <Form>
                <Form.Group controlId="searchType" className="mb-3">
                  <Form.Label>Search by:</Form.Label>
                  <Form.Select value={searchType} onChange={handleSearchTypeChange}>
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
                      {searchType}
                      :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`Search by ${searchType}...`}
                      value={searchQuery}
                      onChange={handleSearchQueryChange}
                    />
                  </Form.Group>
                )}
                <Button className="btn-light mt-3" onClick={handleSearch}>
                  Search Recipes
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* popular recipes section */}
      <Container id="popular-recipes" fluid className="py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col xs={12}>
              <h2>Popular Recipes</h2>
              <h5>Explore some of our community’s favorite recipes</h5>
            </Col>
          </Row>
          <Row className="g-4">
            {/* Render recipes dynamically */}
            {recipes.map((recipe) => (
              <Col key={recipe.id} md={4}>
                <Card>
                  <Card.Img variant="top" src={recipe.imageUrl} alt={recipe.title} />
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>
                      {recipe.description}
                    </Card.Text>
                    <Button variant="dark" onClick={() => router.push(`/recipes/${recipe.slug}`)}>
                      View Recipe
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default HomePage;
