import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard Overview
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome back! Here's what's happening with your store today.
          </Typography>
        </Box>
        
        {/* Dashboard content will go here */}
        <Box sx={{ 
          backgroundColor: 'background.paper',
          p: 3,
          borderRadius: 2,
          boxShadow: 1,
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center'
        }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your dashboard is ready!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Start by adding some content or navigation items to your dashboard.
          </Typography>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default Dashboard;
