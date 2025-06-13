import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Container, Avatar } from '@mui/material';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // TODO: Fetch user profile data
  useEffect(() => {
    // Mock data - replace with actual API call
    setProfile({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      address: '123 Main St, City, Country',
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log('Profile updated:', profile);
    setIsEditing(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ width: 100, height: 100, mb: 2 }} />
          <Typography component="h1" variant="h5">
            {isEditing ? 'Edit Profile' : 'My Profile'}
          </Typography>
        </Box>
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditing}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={!isEditing}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="address"
            label="Address"
            name="address"
            multiline
            rows={3}
            value={profile.address}
            onChange={handleChange}
            disabled={!isEditing}
            sx={{ mb: 3 }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            {isEditing ? (
              <>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                  sx={{ mr: 1 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
