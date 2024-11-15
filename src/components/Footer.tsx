import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center">
        © Rice Cooker Recipes
        <br />
        By Chiara Duyn, Arron Huang, Justin Kugiyama, and Haley Teramoto
        <br />
        Honolulu, HI
        <br />
        <a href="https://github.com/rice-cooker-recipes/rice-cooker.git">GitHub Repo :P</a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
