import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Grid,
  Button,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Chip,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Badge as BadgeIcon,
  AssignmentInd as RoleIcon,
} from '@mui/icons-material';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (!currentUser && storedUser) {
      // If we have stored user data but no current user, redirect to login
      navigate('/login');
    }
    setLoading(false);
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const safeUser = {
    name: currentUser?.name || 'Unknown',
    email: currentUser?.email || 'Unknown',
    id: currentUser?.id || 'Unknown',
    role: currentUser?.role || 'Unknown'
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Typography>Loading your profile...</Typography>
      </Box>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6, px: 2 }}>
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
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 80,
                height: 80,
                fontSize: '1.8rem',
                boxShadow: 4,
                border: '2px solid white'
              }}
            >
              {safeUser.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={
            <Typography variant="h4" component="h1" sx={{
              mb: 0.5,
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}>
              {safeUser.name}
            </Typography>
          }
          subheader={
            <Typography variant="body1" color="text.secondary" sx={{
              fontSize: '0.9rem',
              opacity: 0.8
            }}>
              {safeUser.email}
            </Typography>
          }
          action={
            <IconButton
              color="primary"
              aria-label="edit profile"
              onClick={() => navigate('/profile/edit', { replace: true })}
              size="small"
              sx={{
                p: 0.5,
                '&:hover': {
                  bgcolor: 'primary.light'
                }
              }}
            >
              <EditIcon />
            </IconButton>
          }
          sx={{ pt: 2 }}
        />
        <CardContent sx={{ p: 2, pt: 0 }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 2,
            mt: 1
          }}>
            <Chip
              label={safeUser.role}
              icon={<BadgeIcon sx={{ fontSize: '1rem' }} />}
              color="primary"
              variant="outlined"
              size="medium"
              sx={{
                bgcolor: 'primary.light',
                color: 'primary.main',
                '& .MuiChip-icon': {
                  color: 'primary.main'
                },
                borderRadius: 1,
                px: 2,
                fontSize: '0.9rem'
              }}
            />
          </Box>
          <Typography variant="h6" color="primary" sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2,
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}>
            <PersonIcon sx={{ fontSize: '1.2rem' }} />
            Profile Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1
              }}>
                <PersonIcon color="primary" sx={{ fontSize: '1.2rem' }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}>
                  Full Name
                </Typography>
                <Typography variant="body2" sx={{
                  fontWeight: 600,
                  fontSize: '1rem'
                }}>
                  {safeUser.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1
              }}>
                <EmailIcon color="primary" sx={{ fontSize: '1.2rem' }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}>
                  Email
                </Typography>
                <Typography variant="body2" sx={{
                  fontWeight: 600,
                  fontSize: '1rem'
                }}>
                  {safeUser.email}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1
              }}>
                <BadgeIcon color="primary" sx={{ fontSize: '1.2rem' }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}>
                  User ID
                </Typography>
                <Typography variant="body2" sx={{
                  fontWeight: 600,
                  fontSize: '1rem'
                }}>
                  {safeUser.id}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1
              }}>
                <RoleIcon color="primary" sx={{ fontSize: '1.2rem' }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}>
                  Role
                </Typography>
                <Typography variant="body2" sx={{
                  fontWeight: 600,
                  fontSize: '1rem'
                }}>
                  {safeUser.role}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{
          justifyContent: 'center',
          p: 3,
          px: 4
        }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon sx={{ fontSize: '1.2rem' }} />}
            onClick={handleLogout}
            fullWidth
            sx={{
              borderRadius: 8,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              p: 2,
              '&:hover': {
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="button" sx={{
                fontWeight: 600,
                fontSize: '1rem'
              }}>
                Logout
              </Typography>
            </Box>
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ProfilePage;
