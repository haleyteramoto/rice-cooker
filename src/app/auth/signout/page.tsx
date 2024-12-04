'use client';

import { signOut } from 'next-auth/react';
import { Button, Col, Row, Container, Card } from 'react-bootstrap';

/** After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => (
  <div
    className="login-wrapper position-relative"
    style={{
      backgroundImage: 'url(/signinpic.jpg)', // You can replace this with a sign-out specific image if needed
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}
  >
    {/* Decorative Floating Shapes */}
    <div
      className="login-bg-shapes position-absolute"
      style={{
        zIndex: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {[...Array(10)].map((_, i) => (
        <div
          key={`shape-${Math.random().toString(36).substr(2, 9)}`}
          className="shape"
          style={{
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            animation: `float${i % 3} ${5 + i}s infinite ease-in-out`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${50 + Math.random() * 200}px`,
            height: `${50 + Math.random() * 200}px`,
          }}
        />
      ))}
    </div>

    <Container className="position-relative" style={{ zIndex: 10 }}>
      <Row className="justify-content-center">
        <Col xs={12} md={5}>
          <Card
            className="shadow-lg border-0"
            style={{
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2
                  className="text-dark"
                  style={{
                    fontWeight: 700,
                    color: '#628473',
                    marginBottom: '10px',
                  }}
                >
                  Sign Out
                </h2>
                <p className="text-muted">Are you sure you want to sign out?</p>
              </div>

              <Row className="justify-content-center">
                <Col xs={12} sm={6} md={4}>
                  <Button
                    variant="danger"
                    onClick={() => signOut({ callbackUrl: '/', redirect: true })}
                    style={{
                      width: '100%',
                      background: '#e74c3c',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '10px',
                      fontWeight: 600,
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    Sign Out
                  </Button>
                </Col>

                <Col xs={12} sm={6} md={4} className="mt-3 mt-sm-0">
                  <Button
                    variant="secondary"
                    href="/"
                    style={{
                      width: '100%',
                      background: '#95a5a6',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '10px',
                      fontWeight: 600,
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default SignOut;
