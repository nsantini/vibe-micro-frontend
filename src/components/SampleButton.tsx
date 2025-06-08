'use client';

import * as React from 'react';
import Button from '@mui/material/Button';

interface SampleButtonProps {
  label?: string;
  onClick?: () => void;
}

const SampleButton: React.FC<SampleButtonProps> = ({ label = "Sample Button", onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {label}
    </Button>
  );
};

export default SampleButton;
