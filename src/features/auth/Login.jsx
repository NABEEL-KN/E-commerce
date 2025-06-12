import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';

// Hardcoded credentials for demo
const DEMO_CREDENTIALS = {
  username: 'admin',
  password: 'password123'
};

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });
  
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
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
          <TextField
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
