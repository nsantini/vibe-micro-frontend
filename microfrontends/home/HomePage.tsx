'use client';

import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Home Page Microfrontend!
        </Typography>
        <Typography variant="body1">
          This is a sample microfrontend demonstrating a home page.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
