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
    <StyledFooter>
      <StyledContainer>
        <Grid container spacing={4}>
          <StyledGrid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <StyledSection>
              <Typography variant="body2">
                Welcome to our e-commerce platform! We offer a wide range of products at competitive prices.
              </Typography>
            </StyledSection>
          </StyledGrid>

          <StyledGrid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <StyledSection>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="/about">About Us</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/terms">Terms & Conditions</Link>
                <Link href="/privacy">Privacy Policy</Link>
              </Box>
            </StyledSection>
          </StyledGrid>

          <StyledGrid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
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
        <StyledBox>
          <StyledCopyright>
            <Typography variant="body2">
              {' '}
              {new Date().getFullYear()}
              {' Your Company Name. All rights reserved.'}
            </Typography>
          </StyledCopyright>
        </StyledBox>
      </StyledContainer>
    </StyledFooter>
  );
};

export default Footer;
