'use client';

import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';
import { LoginFormValues } from './form.schema';
import { formStyles } from '@/common/utils/styles';

interface ILoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  isPending: boolean;
  methods: UseFormReturn<LoginFormValues>;
  showPassword: boolean;
  handleTogglePasswordVisibility: () => void;
}

const LoginFormView: React.FC<ILoginFormProps> = ({
  onSubmit,
  isPending,
  methods,
  showPassword,
  handleTogglePasswordVisibility,
}) => {
  return (
    <Box component="form" onSubmit={methods.handleSubmit(onSubmit)} sx={formStyles.container}>
      <FormProvider {...methods}>
        <Box sx={formStyles.formContainer}>
          <Controller
            name="email"
            control={methods.control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email *"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                variant="outlined"
                onBlur={e => field.onChange(e.target.value.trim())}
              />
            )}
          />
          <Controller
            name="password"
            control={methods.control}
            render={({ field, fieldState }) => (
              <Box sx={{ position: 'relative' }}>
                <TextField
                  {...field}
                  label="Senha *"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}
          />
        </Box>
        <Box sx={formStyles.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isPending || !methods.watch('email') || !methods.watch('password')}
          >
            {isPending ? <CircularProgress size={20} /> : 'Entrar'}
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default LoginFormView;
