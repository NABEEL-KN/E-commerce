import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { login } = useAuth();

  const onSubmit = async (data) => {
    setError('');
    setIsSubmitting(true);
    
    try {
      // For demo purposes, we'll use hardcoded credentials
      if (data.username === DEMO_CREDENTIALS.username && data.password === DEMO_CREDENTIALS.password) {
        // In a real app, you would call login with email/password
        const result = await login('admin@example.com', 'password123');
        if (result.success) {
          // Redirect to dashboard on successful login
          navigate('/dashboard');
        } else {
          setError(result.message || 'Invalid username or password');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <StyledBox
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}
      >
        <StyledTitle component="h1" variant="h4">
          Welcome Back
        </StyledTitle>
        {error && (
          <StyledAlert severity="error">
            {error}
          </StyledAlert>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', mt: 2 }}>
          <StyledTextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters'
              },
              maxLength: {
                value: 20,
                message: 'Username cannot exceed 20 characters'
              }
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
            disabled={isSubmitting}
          />
          <StyledTextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              },
              maxLength: {
                value: 30,
                message: 'Password cannot exceed 30 characters'
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={isSubmitting}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <StyledLink href="/forgot-password">Forgot Password?</StyledLink>
          </Box>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </StyledBox>
    </StyledContainer>
  );
};

export default Login;
