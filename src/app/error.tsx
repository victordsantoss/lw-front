'use client';

import { Box, Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        p: 4,
      }}
    >
      <Typography variant="h2" color="error.main" fontWeight={700} gutterBottom>
        Ops!
      </Typography>

      <Typography variant="h5" gutterBottom textAlign="center">
        Algo inesperado aconteceu.
      </Typography>

      <Typography variant="body2" color="text.secondary" textAlign="center" mb={4}>
        {error?.message || 'Erro desconhecido.'}
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button variant="contained" onClick={reset}>
          Tentar novamente
        </Button>

        <Button component={Link} href="/home" variant="outlined">
          Voltar para o início
        </Button>
      </Stack>
    </Box>
  );
}
