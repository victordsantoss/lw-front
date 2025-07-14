'use client';

import { Box, Stack, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import React from 'react';

export interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  iconSize?: 'small' | 'medium' | 'large' | number;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Nenhum item encontrado',
  subtitle,
  icon = <SearchOffIcon />,
  iconSize = 'large',
}) => (
  <Box
    sx={{
      width: '100%',
      minHeight: 200,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'text.secondary',
      p: 2,
    }}
  >
    <Stack spacing={1} alignItems="center">
      <Box
        sx={{
          '& svg': {
            fontSize:
              iconSize === 'small'
                ? 40
                : iconSize === 'medium'
                  ? 60
                  : iconSize === 'large'
                    ? 80
                    : iconSize,
            color: 'primary.main',
          },
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" fontWeight={600} color="primary.main">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" maxWidth={400} color="primary.main">
          {subtitle}
        </Typography>
      )}
    </Stack>
  </Box>
);

export default EmptyState;
