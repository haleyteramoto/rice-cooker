'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

/** The sign in page. */
const SignIn = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const result = await signIn('credentials', {
      callbackUrl: '/list',
      email,
      password,
    });
    if (result?.error) {
      console.error('Sign in failed: ', result.error);
    }
  };

  return (
    <div
      className="login-wrapper position-relative"
      style={{
        backgroundImage: 'url(/signinpic.jpg)',
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
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={5}>
            <h2 className="text-center mb-3">Welcome!</h2>
            <Card
              className="shadow-lg border-0"
              style={{
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Card.Body className="p-5">
                <Form method="post" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-dark">Email</Form.Label>
                    <input
                      name="email"
                      type="text"
                      className="form-control form-control-lg"
                      style={{
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.7)',
                        border: '1px solid rgba(0,0,0,0.1)',
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-dark">Password</Form.Label>
                    <input
                      name="password"
                      type="password"
                      className="form-control form-control-lg"
                      style={{
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.7)',
                        border: '1px solid rgba(0,0,0,0.1)',
                      }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 mt-3"
                    style={{
                      background: '#628473',
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
                    Sign In
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="text-center">
                Don&apos;t have an account?
                {' '}
                <a href="/auth/signup" className="text-success">Sign up here</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignIn;
