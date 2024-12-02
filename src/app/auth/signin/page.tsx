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

    // Attempt to sign in
    const result = await signIn('credentials', {
      redirect: false, // Prevent automatic redirect after login
      email,
      password,
    });

    // If the result has an error, log it and show an alert
    if (result?.error) {
      console.error('Sign in failed: ', result.error);
      // eslint-disable-next-line no-alert
      alert(`Error: ${result.error}`); // Display error in alert (or use a custom UI for errors)
    } else {
      // Redirect to another page upon successful login
      window.location.href = '/list'; // or use router.push('/list') for client-side routing
    }
  };

  return (
    <>
      <style>
        {`
        @keyframes float0 {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float1 {
          0% { transform: translateX(0px); }
          50% { transform: translateX(20px); }
          100% { transform: translateX(0px); }
        }
        @keyframes float2 {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(10deg); }
          100% { transform: rotate(0deg); }
        }
      `}
      </style>
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
              // eslint-disable-next-line react/no-array-index-key
              key={`shape-${i}`}
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
                      Welcome Back!
                    </h2>
                    <p className="text-muted">Sign in to continue to your account</p>
                  </div>

                  <Form method="post" onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label className="text-dark">Email</Form.Label>
                      <input
                        name="email"
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter your email"
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
                        placeholder="Enter your password"
                        style={{
                          borderRadius: '10px',
                          background: 'rgba(255,255,255,0.7)',
                          border: '1px solid rgba(0,0,0,0.1)',
                        }}
                      />
                      <div className="text-end mt-2">
                        <a href="/auth/reset-password" className="text-success small">
                          Forgot Password?
                        </a>
                      </div>
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

                  <div className="text-center mt-4">
                    <p className="text-muted">
                      Don&apos;t have an account?
                      {' '}
                      <a href="/auth/signup" className="text-success">
                        Sign Up
                      </a>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SignIn;
