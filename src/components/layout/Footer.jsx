import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.grey[900],
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              ShopSmart
            </Typography>
            <Typography variant="body2">
              Your one-stop shop for all your shopping needs. Quality products, competitive prices, and excellent service.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" sx={{ textDecoration: 'none', display: 'block', mb: 1, '&:hover': { textDecoration: 'underline' } }}>
              Home
            </Link>
            <Link href="/products" color="inherit" sx={{ textDecoration: 'none', display: 'block', mb: 1, '&:hover': { textDecoration: 'underline' } }}>
              Products
            </Link>
            <Link href="/cart" color="inherit" sx={{ textDecoration: 'none', display: 'block', mb: 1, '&:hover': { textDecoration: 'underline' } }}>
              Cart
            </Link>
            <Link href="/login" color="inherit" sx={{ textDecoration: 'none', display: 'block', mb: 1, '&:hover': { textDecoration: 'underline' } }}>
              Login
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton href="https://facebook.com" target="_blank" aria-label="Facebook" sx={{ color: 'white', '&:hover': { color: '#1877F2' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" aria-label="Twitter" sx={{ color: 'white', '&:hover': { color: '#1DA1F2' } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" aria-label="Instagram" sx={{ color: 'white', '&:hover': { color: '#E4405F' } }}>
                <InstagramIcon />
              </IconButton>
              <IconButton href="https://linkedin.com" target="_blank" aria-label="LinkedIn" sx={{ color: 'white', '&:hover': { color: '#0A66C2' } }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton href="https://github.com" target="_blank" aria-label="GitHub" sx={{ color: 'white', '&:hover': { color: theme.palette.grey[400] } }}>
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ pt: 5, mt: 5, borderTop: `1px solid ${theme.palette.grey[800]}` }}>
          <Typography variant="body2" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' ShopSmart. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
