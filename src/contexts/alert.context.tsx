'use client';

import { Snackbar, Alert as MuiAlert, AlertProps } from '@mui/material';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AlertContextType {
  showAlert: (message: string, severity: AlertProps['severity']) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertProps['severity']>('info');
  const [autoHideDuration, setAutoHideDuration] = useState<number | null>(5000);

  const showAlert = useCallback((message: string, severity: AlertProps['severity']) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseEnter = () => {
    setAutoHideDuration(null);
  };

  const handleMouseLeave = () => {
    setAutoHideDuration(5000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
