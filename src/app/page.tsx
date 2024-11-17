import { Col, Container, Row } from 'react-bootstrap';
import { Basket3Fill, Search, Share } from 'react-bootstrap-icons';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Container>
        <Row className="align-middle text-center">
          <Col xs={4}>
            <Basket3Fill size={80} />
            <h2>One Pot Recipes</h2>
            <h5>
              Discover a variety of delicious one-pot recipes that are easy to prepare and perfect for any meal.
              From hearty stews to flavorful rice dishes, find recipes that simplify cooking and cleanup.
            </h5>
          </Col>
          <Col xs={4}>
            <Search size={80} />
            <h2>Find Your Ingredients</h2>
            <h5>
              Having trouble finding an ingredient? Use our search feature to find stores/vendors that carry
              the ingredient you are looking for.
            </h5>
          </Col>
          <Col xs={4}>
            <Share size={80} />
            <h2>Share Your Recipes</h2>
            <h5>
              Share your own recipes with our community and help others discover new and exciting dishes.
              Inspire others with your culinary creations and be part of a growing network of home cooks.
            </h5>
          </Col>
        </Row>
      </Container>
    </Container>
  </main>
);

export default Home;
