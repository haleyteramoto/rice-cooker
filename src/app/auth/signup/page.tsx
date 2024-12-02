// signup, page.tsx

'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { createUser } from '@/lib/dbActions';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

/** The sign up page. */
const SignUp = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    await createUser(data);
    await signIn('credentials', { callbackUrl: '/add', ...data });
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
          backgroundImage: 'url(/signinpic.jpg)', // same image as sign-in
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
                      Join Us!
                    </h2>
                    <p className="text-muted">Create a new account</p>
                  </div>

                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-4">
                      <Form.Label className="text-dark">Email</Form.Label>
                      <input
                        type="text"
                        {...register('email')}
                        className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Enter your email"
                        style={{
                          borderRadius: '10px',
                          background: 'rgba(255,255,255,0.7)',
                          border: '1px solid rgba(0,0,0,0.1)',
                        }}
                      />
                      <div className="invalid-feedback">{errors.email?.message}</div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark">Password</Form.Label>
                      <input
                        type="password"
                        {...register('password')}
                        className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Enter your password"
                        style={{
                          borderRadius: '10px',
                          background: 'rgba(255,255,255,0.7)',
                          border: '1px solid rgba(0,0,0,0.1)',
                        }}
                      />
                      <div className="invalid-feedback">{errors.password?.message}</div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="text-dark">Confirm Password</Form.Label>
                      <input
                        type="password"
                        {...register('confirmPassword')}
                        className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        placeholder="Confirm your password"
                        style={{
                          borderRadius: '10px',
                          background: 'rgba(255,255,255,0.7)',
                          border: '1px solid rgba(0,0,0,0.1)',
                        }}
                      />
                      <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
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
                      Register
                    </Button>
                  </Form>

                  <div className="text-center mt-4">
                    <p className="text-muted">
                      Already have an account?
                      {' '}
                      <a href="/auth/signin" className="text-success">
                        Sign In
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

export default SignUp;
