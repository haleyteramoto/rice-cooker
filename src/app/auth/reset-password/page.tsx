// src/app/auth/reset-password/page.tsx

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import swal from 'sweetalert';

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
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
    reset,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      swal('Error', 'Invalid or missing token.', 'error');
      return;
    }

    setIsSubmitting(true);

    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password: data.password }),
    });

    if (response.ok) {
      swal('Success', 'Your password has been reset.', 'success').then(() => {
        router.push('/auth/signin');
      });
    } else {
      const result = await response.json();
      swal('Error', result.error || 'Failed to reset password.', 'error');
    }

    setIsSubmitting(false);
    reset();
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
          backgroundImage: 'url(/signinpic.jpg)', // Use the same background image as sign in
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
                      Forgot Your Password?
                    </h2>
                    <p className="text-muted">Enter new password below</p>
                  </div>

                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-4">
                      <Form.Label className="text-dark">New Password</Form.Label>
                      <input
                        type="password"
                        {...register('password')}
                        className="form-control form-control-lg"
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
                        className="form-control form-control-lg"
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
                      disabled={isSubmitting}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {isSubmitting ? 'Resetting...' : 'Reset Password'}
                    </Button>
                  </Form>

                  <div className="text-center mt-4">
                    <p className="text-muted">
                      Remembered your password?
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

export default ResetPassword;
