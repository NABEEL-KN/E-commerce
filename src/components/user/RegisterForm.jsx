import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { Box, Button, Container, TextField, Typography, Alert, Link, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  width: '100vw',
  maxWidth: '100vw',
  boxSizing: 'border-box',
  background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: 24,
  padding: theme.spacing(6),
  width: '100%',
  maxWidth: 450,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-2px)',
  },
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: 700,
  fontSize: '2.2rem',
  textAlign: 'center',
  color: theme.palette.primary.main,
  textTransform: 'capitalize',
  letterSpacing: '0.5px',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: theme.shadows[2],
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    '&.Mui-focused': {
      boxShadow: theme.shadows[4],
      backgroundColor: 'rgba(255, 255, 255, 1)',
      transform: 'translateY(-2px)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: '2px',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: '2px',
  },
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(2),
  },
  margin: theme.spacing(1, 0),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 24,
  padding: theme.spacing(1.5, 6),
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1.2rem',
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[8],
    transform: 'translateY(-3px)',
    backgroundColor: theme.palette.primary.dark,
  },
  marginTop: theme.spacing(3),
  minWidth: '200px',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 500,
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.dark,
    transform: 'translateY(-1px)',
  },
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const StyledAlert = styled(Alert)(({ theme }) => ({
  borderRadius: 16,
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const Signup = () => {
  const theme = useTheme();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [error, setError] = React.useState('');

  const onSubmit = async (data) => {
    const result = await signup(data);
    if (result.success) {
      navigate('/login');
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
          Create Account
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
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <StyledTextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            autoComplete="new-password"
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
          <StyledTextField
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              validate: (value, formValues) => 
                value === formValues.password || 'Passwords do not match'
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Create Account
          </StyledButton>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              Already have an account?{' '}
              <StyledLink href="/login">Sign In</StyledLink>
            </Typography>
          </Box>
        </Box>
      </StyledBox>
    </StyledContainer>
  );
};

export default Signup;
