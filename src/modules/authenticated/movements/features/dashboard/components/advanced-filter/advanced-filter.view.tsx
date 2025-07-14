import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import { MOVEMENT_TYPE_OPTIONS } from '@/modules/authenticated/movements/defaults';
import { IFilterState } from './advanced-filter.model';
import { Account } from '@/modules/authenticated/accounts/services/accounts/accounts.types';

export interface IAdvancedFilterViewProps {
  filters: IFilterState;
  handleFilterChange: (field: keyof IFilterState, value: string | null) => void;
  categoryOptions: { value: string; label: string }[];
  debouncedUpdateQueryParam: (key: string, value: string | null) => void;
  accountsData: Account.IListAccountItem[];
}

export const AdvancedFilterView = ({
  filters,
  handleFilterChange,
  categoryOptions,
  debouncedUpdateQueryParam,
  accountsData,
}: IAdvancedFilterViewProps) => {
  return (
    <Box minWidth={'100%'} display={'flex'} flexDirection={'row'} gap={2} flex={1}>
      <Box width={{ xs: '100%', md: '1/3' }}>
        <Autocomplete
          options={categoryOptions}
          getOptionLabel={option => option.label}
          value={categoryOptions.find(option => option.value === filters.category) || null}
          onChange={(_, newValue) => {
            handleFilterChange('category', newValue?.value || null);
            debouncedUpdateQueryParam('category', newValue?.value || null);
          }}
          renderInput={params => (
            <TextField
              {...params}
              label="Categoria"
              placeholder="Selecione uma categoria"
              variant="outlined"
              sx={{ minWidth: '100%' }}
              fullWidth
            />
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              key={option.value}
              sx={{
                '& .MuiAutocomplete-option': {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 'medium' }} color={'primary.main'}>
                {option.label}
              </Typography>
            </Box>
          )}
        />
      </Box>
      <Box width={{ xs: '100%', md: '1/3' }}>
        <Autocomplete
          options={MOVEMENT_TYPE_OPTIONS}
          getOptionLabel={option => option.label}
          value={
            MOVEMENT_TYPE_OPTIONS.find(option => option.value === filters.transactionType) || null
          }
          onChange={(_, newValue) => {
            handleFilterChange('transactionType', newValue?.value || null);
            debouncedUpdateQueryParam('transactionType', newValue?.value || null);
          }}
          renderInput={params => (
            <TextField
              {...params}
              label="Tipo de Transação"
              placeholder="Selecione um tipo"
              variant="outlined"
              fullWidth
            />
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              key={option.value}
              sx={{
                '& .MuiAutocomplete-option': {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 'medium' }} color={'primary.main'}>
                {option.label}
              </Typography>
            </Box>
          )}
        />
      </Box>
      <Box width={{ xs: '100%', md: '1/3' }}>
        <Autocomplete
          options={accountsData}
          getOptionLabel={option => option.accountNumber}
          value={accountsData.find(option => option.id === filters.accountId) || null}
          onChange={(_, newValue) => {
            handleFilterChange('accountId', newValue?.id || null);
            debouncedUpdateQueryParam('accountId', newValue?.id || null);
          }}
          renderInput={params => (
            <TextField
              {...params}
              label="Conta"
              placeholder="Selecione uma conta"
              variant="outlined"
              fullWidth
            />
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              key={option.id}
              sx={{
                '& .MuiAutocomplete-option': {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 'medium' }} color={'primary.main'}>
                {option.accountNumber}
              </Typography>
            </Box>
          )}
        />
      </Box>
    </Box>
  );
};
