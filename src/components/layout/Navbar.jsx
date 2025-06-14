import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

// Styled components
const StyledToolbar = styled('div')(({ theme }) => ({
  minHeight: '40px',
  padding: '8px 24px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '8px 16px',
  },
}));

const Navbar = () => {
  // Navigation items - Home and Products are clickable
  const navItems = [
    { text: 'Home', path: '/', clickable: true },
    { text: 'Products', path: '/products', clickable: true },
    { text: 'Categories', clickable: false },
    { text: 'Deals', clickable: false },
    { text: 'New Arrivals', clickable: false },
    { text: 'Best Sellers', clickable: false },
    { text: 'About', clickable: false },
    { text: 'Contact', clickable: false }
  ];

  return (
    <Container maxWidth={false} disableGutters>
      <StyledToolbar>
        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          width: '100%', 
          justifyContent: 'center',
          alignItems: 'center' 
        }}>
          {navItems.map((item) => (
            <Typography 
              key={item.text}
              component={item.clickable ? RouterLink : 'div'}
              to={item.clickable ? item.path : undefined}
              variant="body1"
              sx={{
                cursor: item.clickable ? 'pointer' : 'default',
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: 700,
                fontFamily: '"Poppins", sans-serif',
                '&:hover': {
                  color: 'primary.dark',
                },
              }}
            >
              {item.text}
            </Typography>
          ))}
        </Box>
      </StyledToolbar>
    </Container>
  );
};

export default Navbar;
