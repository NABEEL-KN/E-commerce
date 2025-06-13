import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const StyledFooter = styled(Box)(({ theme }) => ({
  component: 'footer',
  padding: theme.spacing(3, 0),
  width: '100%',
  maxWidth: '100%',
  backgroundColor: '#1976d2',
  color: '#ffffff',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  padding: theme.spacing(0, 2),
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  '& h6': {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  // Grid v2 responsive props
  '@media (min-width: 0px)': {
    gridColumn: 'span 12',
  },
  '@media (min-width: 600px)': {
    gridColumn: 'span 4',
  },
}));

const StyledSection = styled(Box)(({ theme }) => ({
  '& p': {
    marginBottom: theme.spacing(1.5),
    color: '#ffffff', // white text for paragraphs
  },
  '& a': {
    textDecoration: 'none',
    display: 'block',
    marginBottom: theme.spacing(1),
    transition: 'color 0.3s ease',
    color: '#ffffff', // white text for links
    '&:hover': {
      color: '#ffffff', // white text on hover
    },
  },
}));

const StyledIcon = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'scale(1.1)',
  },
  '& svg': {
    fontSize: '1.5rem',
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  width: '100%',
  padding: theme.spacing(2, 0),
}));

const StyledCopyright = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 1,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[900],
        color: 'white',
        width: '100%',
        m: 0
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1400px', mx: 'auto', px: 1 }}>
        <Grid container spacing={4}>
          <Grid xs={12}>
            <Typography variant="h6" color="white" gutterBottom>
              ShopSmart
            </Typography>
            <Typography variant="body2" color="white">
              Your one-stop shop for all your shopping needs.
              Quality products, competitive prices, and excellent service.
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Typography variant="h6" color="white" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/products" color="inherit" display="block" sx={{ mb: 1 }}>
              Products
            </Link>
            <Link href="/cart" color="inherit" display="block" sx={{ mb: 1 }}>
              Cart
            </Link>
            <Link href="/login" color="inherit" display="block" sx={{ mb: 1 }}>
              Login
            </Link>
          </Grid>
          <Grid xs={12}>
            <Typography variant="h6" color="white" gutterBottom>
              Contact Us
            </Typography>
            <StyledSection>
              <Box sx={{ display: 'flex', gap: 3, mt: 2, justifyContent: 'center' }}>
                <StyledIcon>
                  <FacebookIcon />
                </StyledIcon>
                <StyledIcon>
                  <TwitterIcon />
                </StyledIcon>
                <StyledIcon>
                  <InstagramIcon />
                </StyledIcon>
                <StyledIcon>
                  <LinkedInIcon />
                </StyledIcon>
                <StyledIcon>
                  <GitHubIcon />
                </StyledIcon>
              </Box>
            </StyledSection>
          </StyledGrid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" color="white" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' ShopSmart. All rights reserved.'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
