'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; // Example icon
import { getRegisteredMicrofrontends } from '@/utils/microfrontendRegistry';
import { Microfrontend } from '@/types/microfrontend';
import '@/lib/microfrontendLoader';

export default function Navigation() {
  const [microfrontends, setMicrofrontends] = useState<Microfrontend[]>([]);

  useEffect(() => {
    setMicrofrontends(getRegisteredMicrofrontends());
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Microfrontend Host
          </Typography>
          <Button color="inherit" component={Link} href="/">
            Home (Host)
          </Button>
          {microfrontends.map((mfe) => (
            <Button
              key={mfe.id}
              color="inherit"
              component={Link}
              href={`/${mfe.path}`}
            >
              {mfe.name}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
