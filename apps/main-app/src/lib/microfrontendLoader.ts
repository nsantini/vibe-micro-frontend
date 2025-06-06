import React from 'react';
import { registerMicrofrontend } from '@/utils/microfrontendRegistry';

// Lazily load the HomePage microfrontend component
const HomePageMFE = React.lazy(() => import('../../microfrontends/home/HomePage'));
// Using a direct relative path from src/lib for clarity and robustness.

// Register the Home microfrontend
registerMicrofrontend({
  id: 'home',
  path: 'home', // URL path will be /home
  name: 'Home MFE', // Display name for navigation
  component: HomePageMFE,
  meta: {
    // any additional metadata
  },
});

// To ensure this module executes and registers the MFE, 
// it needs to be imported in a central part of the application,
// e.g., in RootLayout (layout.tsx) or the main page.tsx.
// console.log('Home microfrontend registered by microfrontendLoader.ts'); // For debugging
