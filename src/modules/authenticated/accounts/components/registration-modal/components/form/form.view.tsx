'use client';

import React from 'react';
import { Box, Button, TextField, Autocomplete, Tooltip, CircularProgress } from '@mui/material';
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form';
import { RegistrationAccountFormValues } from './form.schema';
import { formStyles } from '@/common/utils/styles';
import { ACCOUNT_TYPE_OPTIONS } from '@/modules/authenticated/accounts/defaults/account-types.defaults';

interface RegistrationAccountFormViewProps {
  closeCreateAccountModal: () => void;
  onSubmit: (values: RegistrationAccountFormValues) => void;
  isPending: boolean;
  methods: UseFormReturn<RegistrationAccountFormValues>;
}

const RegistrationAccountFormView: React.FC<RegistrationAccountFormViewProps> = ({
  closeCreateAccountModal,
  onSubmit,
  isPending,
  methods,
}) => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = methods;

  const registerDisabled = isPending || isSubmitting || !isValid;

  const handleFormSubmit = async (values: RegistrationAccountFormValues) => {
    onSubmit(values);
    closeCreateAccountModal();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={formStyles.container}
      noValidate
    >
      <FormProvider {...methods}>
        <Box sx={{ ...formStyles.formContainer, gap: 2 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome ou Apelido da Conta"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                variant="outlined"
                onBlur={e => field.onChange(e.target.value.trim())}
              />
            )}
          />
          <Controller
            name="accountNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Número da Conta *"
                placeholder="Ex: 123456"
                fullWidth
                error={!!errors.accountNumber}
                helperText={errors.accountNumber?.message}
                variant="outlined"
                onBlur={e => field.onChange(e.target.value.trim())}
              />
            )}
          />
          <Controller
            name="agency"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Agência *"
                placeholder="Ex: 0001"
                fullWidth
                error={!!errors.agency}
                helperText={errors.agency?.message}
                variant="outlined"
                onBlur={e => field.onChange(e.target.value.trim())}
              />
            )}
          />
          <Controller
            name="bankName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome do Banco *"
                placeholder="Ex: Banco do Brasil"
                fullWidth
                error={!!errors.bankName}
                helperText={errors.bankName?.message}
                variant="outlined"
                onBlur={e => field.onChange(e.target.value.trim())}
              />
            )}
          />
          <Controller
            name="bankCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Código do Banco *"
                placeholder="Ex: 001"
                fullWidth
                error={!!errors.bankCode}
                helperText={errors.bankCode?.message}
                variant="outlined"
                onBlur={e => field.onChange(e.target.value.trim())}
              />
            )}
          />
          <Controller
            name="accountType"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={ACCOUNT_TYPE_OPTIONS}
                getOptionLabel={option => option.label}
                value={ACCOUNT_TYPE_OPTIONS.find(option => option.value === field.value) || null}
                onChange={(_, newValue) => {
                  field.onChange(newValue?.value || '');
                }}
                fullWidth
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Tipo de Conta *"
                    placeholder="Selecione o tipo de conta"
                    fullWidth
                    error={!!errors.accountType}
                    helperText={errors.accountType?.message}
                    variant="outlined"
                    sx={{
                      '& .MuiInputBase-input': { color: 'primary.main' },
                      '& .MuiSvgIcon-root': { color: 'primary.main' },
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    {...props}
                    key={option.value}
                    sx={{
                      backgroundColor: 'white',
                      color: 'primary.main',
                    }}
                  >
                    <Box>
                      <Box component="span" sx={{ fontWeight: 'medium' }}>
                        {option.label}
                      </Box>
                      <Box
                        component="span"
                        sx={{ fontSize: '0.875rem', color: 'text.secondary', display: 'block' }}
                      >
                        {option.description}
                      </Box>
                    </Box>
                  </Box>
                )}
                sx={{
                  width: '100%',
                  '& .MuiAutocomplete-tag': {
                    backgroundColor: 'background.paper',
                    color: 'primary.main',
                  },
                }}
              />
            )}
          />
          <Controller
            name="balance"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Saldo Inicial"
                placeholder="Ex: 1000"
                fullWidth
                type="number"
                error={!!errors.balance}
                helperText={errors.balance?.message}
                variant="outlined"
                onBlur={e => field.onChange(e.target.value.trim())}
              />
            )}
          />
        </Box>
      </FormProvider>

      <Box sx={formStyles.buttonContainer}>
        <Tooltip
          title={registerDisabled && 'Por favor, preencha todos os campos obrigatórios'}
          arrow
        >
          <span style={{ width: '100%' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={registerDisabled}
            >
              {isPending ? <CircularProgress size={20} /> : 'Registrar'}
            </Button>
          </span>
        </Tooltip>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={closeCreateAccountModal}
          disabled={isPending}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default RegistrationAccountFormView;
