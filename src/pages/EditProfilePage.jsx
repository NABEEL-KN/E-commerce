import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  IconButton,
  Card,
  CardContent,
  Divider,
  Alert,
  AlertTitle,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const EditProfilePage = () => {
  const { currentUser, updateProfile } = useAuth();
  const navigate = useNavigate();

  // Initialize form state with current user data
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProfile(formData);
      if (updatedUser) {
        navigate('/profile', { replace: true });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Add error notification here if needed
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  const theme = useTheme();
  const [error, setError] = useState(null);

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Card
        sx={{
          boxShadow: 2,
          borderRadius: 2,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 4
          },
          p: 4
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 2
            }}
          >
            Edit Profile
          </Typography>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              bgcolor: theme.palette.primary.main,
              mb: 3,
              fontSize: '3rem',
              boxShadow: 4,
              border: '2px solid white'
            }}
          >
            {formData.name.charAt(0).toUpperCase()}
          </Avatar>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <AlertTitle>Error</AlertTitle>
            {error.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PersonIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="subtitle1" color="text.secondary">
                    Full Name
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  size="medium"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'primary.light'
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmailIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="subtitle1" color="text.secondary">
                    Email
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  size="medium"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'primary.light'
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main'
                      }
                    }
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                sx={{
                  color: theme.palette.error.main,
                  borderColor: theme.palette.error.main,
                  '&:hover': {
                    backgroundColor: theme.palette.error.light
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark
                  }
                }}
              >
                Save Changes
              </Button>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
};

export default EditProfilePage;
