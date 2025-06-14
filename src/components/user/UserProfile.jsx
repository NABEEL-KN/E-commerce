import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Grid,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useAuth } from '../../features/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <StyledAvatar src={user.avatar || '/default-avatar.png'}>
                  {user.name[0]}
                </StyledAvatar>
                <Typography variant="h5" component="h2">
                  {user.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {user.email}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            </CardActions>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Name"
                  value={user.name}
                  disabled
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={user.email}
                  disabled
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Phone"
                  value={user.phone || ''}
                  disabled
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Address"
                  value={user.address || ''}
                  disabled
                  margin="normal"
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/profile/edit')}
              >
                Edit Profile
              </Button>
            </CardActions>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
