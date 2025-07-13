'use client';

import { Box } from '@mui/material';
import React from 'react';
import { authLayoutStyle } from './styles';

export default function PublicLayoutComponent({ children }: { children: React.ReactNode }) {
  return (
    <Box component="div" sx={authLayoutStyle.container}>
      <Box component="main" sx={authLayoutStyle.main}>
        {children}
      </Box>
    </Box>
  );
}
