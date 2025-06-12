import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Box, Button, Container, TextField, Typography, Alert, Link, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  padding: theme.spacing(5),
  width: '100%',
  maxWidth: 450,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  fontSize: '2.5rem',
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: theme.shadows[2],
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    '&.Mui-focused': {
      boxShadow: theme.shadows[4],
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1.5, 4),
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1.1rem',
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[8],
    transform: 'translateY(-2px)',
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 500,
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.dark,
  },
}));

const StyledAlert = styled(Alert)(({ theme }) => ({
  borderRadius: 12,
  marginBottom: theme.spacing(2),
}));

const Login = () => {
  const theme = useTheme();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = React.useState('');

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
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
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <StyledLink href="/forgot-password">Forgot Password?</StyledLink>
          </Box>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Sign In
          </StyledButton>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              Don't have an account?{' '}
              <StyledLink href="/signup">Sign Up</StyledLink>
            </Typography>
          </Box>
        </Box>
      </StyledBox>
    </StyledContainer>
  );
};

export default Login;
