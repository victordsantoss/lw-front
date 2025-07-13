'use client';

import { Box, CircularProgress } from '@mui/material';
import { containerStyles } from './styles';

export default function PageLoadingComponent() {
  return (
    <Box sx={containerStyles.container}>
      <CircularProgress />
    </Box>
  );
}
