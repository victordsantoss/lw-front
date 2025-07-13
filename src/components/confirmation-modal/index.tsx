'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { IConfirmationModalProps } from './confirmation-modal.types';

const ConfirmationModal: React.FC<IConfirmationModalProps> = ({
  open,
  onClose,
  title = 'Confirmar ação',
  message = 'Tem certeza que deseja realizar esta ação?',
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth={true}
      PaperProps={{
        sx: {
          minWidth: { xs: '90vw', sm: '600px' },
          maxWidth: { xs: '95vw', sm: '600px' },
        },
      }}
    >
      <DialogTitle>
        <Typography color="primary" gutterBottom fontSize={24} fontWeight={600}>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body1" color="black" fontSize={16}>
            {message}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={1}
          width={'100%'}
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
            gap: 1,
            justifyContent: { xs: 'center', md: 'flex-end' },
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={onClose}
            sx={{ minWidth: 100, width: { xs: '100%', md: 'auto' } }}
            fullWidth
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            sx={{ minWidth: 100, width: { xs: '100%', md: 'auto' } }}
            fullWidth
          >
            Confirmar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
