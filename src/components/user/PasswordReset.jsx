import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
}));

const PasswordReset = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const onSubmit = async (data) => {
    try {
      // TODO: Implement password reset logic
      setSuccess('Password reset instructions sent to your email');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <StyledContainer>
      <StyledBox>
        <StyledTitle>Reset Password</StyledTitle>
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <StyledTextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>

          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <Link href="/signup" variant="body2">
              Sign Up
            </Link>
          </Typography>
        </form>
      </StyledBox>
    </StyledContainer>
  );
};

export default PasswordReset;
