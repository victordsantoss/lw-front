'use client';

import React from 'react';
import {
  Box,
  Button,
  TextField,
  Autocomplete,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';
import { RegisterMovementFormValues } from './form.schema';
import { Account } from '@/modules/authenticated/accounts/services/accounts/accounts.types';
import { formStyles } from '@/common/utils/styles';

interface RegisterMovementFormViewProps {
  onSubmit: (values: RegisterMovementFormValues) => void;
  onCancel: () => void;
  isPending: boolean;
  methods: UseFormReturn<RegisterMovementFormValues>;
  watchedType: 'deposit' | 'withdraw' | 'transfer';
  movementTypeOptions: { value: string; label: string }[];
  accountsData: Account.IListAccountItem[];
  destinationAccounts: Account.IListAccountItem[];
  isLoadingAccounts: boolean;
}

const RegisterMovementFormView: React.FC<RegisterMovementFormViewProps> = ({
  onSubmit,
  onCancel,
  isPending,
  methods,
  watchedType,
  movementTypeOptions,
  accountsData,
  destinationAccounts,
  isLoadingAccounts,
}) => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
    setValue,
  } = methods;

  const isFormDisabled = isPending || isSubmitting;

  const handleFormSubmit = async (values: RegisterMovementFormValues) => {
    onSubmit(values);
  };

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Paper elevation={2} sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" gutterBottom color='primary.main'>
          Registrar Movimentação Financeira
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={{ mt: 3 }}
          noValidate
        >
          <FormProvider {...methods}>
            <Box sx={{ ...formStyles.formContainer, gap: 3, color: 'text.primary' }}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={movementTypeOptions}
                    getOptionLabel={(option) => option.label}
                    value={movementTypeOptions.find(option => option.value === field.value) || null}
                    onChange={(_, newValue) => {
                      field.onChange(newValue?.value || 'deposit');
                      if (newValue?.value !== 'transfer') {
                        setValue('destination', '');
                      }
                    }}
                    disabled={isFormDisabled}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tipo de Movimentação *"
                        error={!!errors.type}
                        helperText={errors.type?.message}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                    renderOption={(props, option) => (
                      <li {...props}>
                        <Typography variant="body1" color="primary.main">
                          {option.label}
                        </Typography>
                      </li>
                    )}
                  />
                )}
              />

              <Controller
                name="origin"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={accountsData}
                    getOptionLabel={(option) => `${option.accountNumber} - ${option.name || 'Sem nome'}`}
                    value={accountsData.find(option => option.id === field.value) || null}
                    onChange={(_, newValue) => {
                      field.onChange(newValue?.id || '');
                      const currentDestination = methods.getValues('destination');
                      if (currentDestination === newValue?.id) {
                        setValue('destination', '');
                      }
                    }}
                    disabled={isFormDisabled || isLoadingAccounts}
                    loading={isLoadingAccounts}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={
                          watchedType === 'deposit'
                            ? 'Conta de Destino *'
                            : 'Conta de Origem *'
                        }
                        error={!!errors.origin}
                        helperText={errors.origin?.message}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                    renderOption={(props, option) => (
                      <li {...props}>
                        <Typography variant="body1" color="primary.main">
                          {option.accountNumber}
                        </Typography>
                      </li>
                    )}
                  />
                )}
              />

              {watchedType === 'transfer' && (
                <Controller
                  name="destination"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={destinationAccounts}
                      getOptionLabel={(option) => `${option.accountNumber} - ${option.name || 'Sem nome'}`}
                      value={destinationAccounts.find(option => option.id === field.value) || null}
                      onChange={(_, newValue) => {
                        field.onChange(newValue?.id || '');
                      }}
                      disabled={isFormDisabled || isLoadingAccounts}
                      loading={isLoadingAccounts}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Conta de Destino *"
                          error={!!errors.destination}
                          helperText={errors.destination?.message}
                          variant="outlined"
                          fullWidth
                          sx={{ color: 'text.primary' }}
                        />
                      )}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <Typography variant="body1" color="primary.main">
                            {option.accountNumber}
                          </Typography>
                        </li>
                      )}
                    />
                  )}
                />
              )}

              <Controller
                name="balance"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Valor *"
                    placeholder="Ex: 1000.00"
                    type="number"
                    inputProps={{
                      min: 0,
                      step: 0.01,
                    }}
                    fullWidth
                    error={!!errors.balance}
                    helperText={errors.balance?.message}
                    variant="outlined"
                    disabled={isFormDisabled}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Descrição"
                    placeholder="Descrição da movimentação (opcional)"
                    multiline
                    rows={3}
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    variant="outlined"
                    disabled={isFormDisabled}
                  />
                )}
              />
            </Box>
          </FormProvider>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: { xs: 2, md: 4 }, flexDirection: { xs: 'column', md: 'row' } }}>
            <Button
              variant="outlined"
              onClick={onCancel}
              disabled={isFormDisabled}
              size="large"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isFormDisabled || !isValid}
              size="large"
            >
              {isPending ? <CircularProgress size={24} /> : 'Registrar Movimentação'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterMovementFormView; 