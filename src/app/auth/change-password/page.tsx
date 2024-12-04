'use client';

import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { changePassword } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';

type ChangePasswordForm = {
  oldpassword: string;
  password: string;
  confirmPassword: string;
};

/** The change password page. */
const ChangePassword = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email || '';
  const validationSchema = Yup.object().shape({
    oldpassword: Yup.string().required('Password is required'),
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
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    await changePassword({ email, ...data });
    await swal('Password Changed', 'Your password has been changed', 'success', { timer: 2000 });
    reset();
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="change-password-wrapper position-relative"
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
        className="background-shapes position-absolute"
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
                  <h2 className="text-dark" style={{ fontWeight: 700, color: '#628473' }}>
                    Change Password
                  </h2>
                  <p className="text-muted">Update your account credentials</p>
                </div>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-dark">Old Password</Form.Label>
                    <input
                      type="password"
                      {...register('oldpassword')}
                      className={`form-control form-control-lg ${errors.oldpassword ? 'is-invalid' : ''}`}
                      placeholder="Enter your old password"
                      style={{
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.7)',
                        border: '1px solid rgba(0,0,0,0.1)',
                      }}
                    />
                    <div className="invalid-feedback">{errors.oldpassword?.message}</div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-dark">New Password</Form.Label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Enter your new password"
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
                      placeholder="Confirm your new password"
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
                    className="w-100"
                    style={{
                      background: '#628473',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '10px',
                      fontWeight: 600,
                    }}
                  >
                    Change Password
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChangePassword;
