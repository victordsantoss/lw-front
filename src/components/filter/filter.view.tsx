'use client';

import React from 'react';
import {
  Box,
  TextField,
  Autocomplete,
  Typography,
  Divider,
  IconButton,
  Collapse,
  Button,
  InputAdornment,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { SortOptionsValues } from '@/common/enums/order-options.enum';
import { FilterState } from './filter.model';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Option } from './filter.types';

interface IFilterViewProps {
  onRegisterClick: () => void;
  sortOptions: Option[];
  searchPlaceholder: string;
  orderOptions: Option[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  debouncedUpdateQueryParam: (key: string, value: string | null) => void;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: React.Dispatch<React.SetStateAction<boolean>>;
  AdvancedFilter?: React.ReactNode;
}

export const FilterView = ({
  onRegisterClick,
  sortOptions,
  orderOptions,
  filterState,
  setFilterState,
  debouncedUpdateQueryParam,
  showAdvancedFilters,
  setShowAdvancedFilters,
  searchPlaceholder = 'Pesquisar',
  AdvancedFilter,
}: IFilterViewProps) => {
  return (
    <Box width="100%" display="flex" flexDirection={'column'} gap={{ xs: 1, md: 2 }}>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        gap={{ xs: 1, md: 2 }}
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <TextField
          label="Pesquisar por"
          placeholder={searchPlaceholder}
          fullWidth
          value={filterState.search}
          onChange={e => {
            const val = e.target.value;
            setFilterState(s => ({ ...s, search: val }));
            debouncedUpdateQueryParam('search', val || null);
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: filterState.search ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setFilterState(s => ({ ...s, search: '' }));
                      debouncedUpdateQueryParam('search', null);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : (
                <></>
              ),
            },
          }}
        />
        <Autocomplete<Option>
          options={orderOptions}
          getOptionLabel={opt => opt.label}
          value={filterState.orderBy}
          onChange={(_, newVal) => {
            setFilterState(s => ({ ...s, orderBy: newVal }));
            debouncedUpdateQueryParam('orderBy', newVal?.value || null);
          }}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              <Typography color="primary">{option.label}</Typography>
            </li>
          )}
          renderInput={params => (
            <TextField
              {...params}
              label="Ordenar por"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input': { color: 'primary.main' },
                '& .MuiSvgIcon-root': { color: 'primary.main' },
              }}
            />
          )}
          isOptionEqualToValue={(opt, val) => opt.value === val.value}
          sx={{ width: { xs: '100%', md: '20%' } }}
        />
        <Autocomplete<Option>
          options={sortOptions}
          getOptionLabel={opt => opt.label}
          value={filterState.sortBy}
          onChange={(_, newVal) => {
            setFilterState(s => ({ ...s, sortBy: newVal }));
            debouncedUpdateQueryParam('sortBy', newVal?.value || null);
          }}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              <Box display={'flex'} alignItems={'center'} gap={{ xs: 1, md: 2 }}>
                {option.value === SortOptionsValues.ASC ? (
                  <ArrowUpwardIcon color="primary" />
                ) : (
                  <ArrowDownwardIcon color="primary" />
                )}
                <Typography color="primary">{option.label}</Typography>
              </Box>
            </li>
          )}
          renderInput={params => (
            <TextField
              {...params}
              label="Ordem"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input': { color: 'primary.main' },
                '& .MuiSvgIcon-root': { color: 'primary.main' },
              }}
            />
          )}
          isOptionEqualToValue={(opt, val) => opt.value === val.value}
          sx={{ width: { xs: '100%', md: '20%' } }}
        />
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={onRegisterClick}
          sx={{ marginLeft: 'auto', width: { xs: '100%', md: '20%' }, height: '56px' }}
        >
          <AddIcon />
          <Typography> REGISTRAR </Typography>
        </Button>
      </Box>
      <Divider orientation="horizontal" flexItem>
        <Box display={'flex'} alignItems={'center'} m={0}>
          <IconButton
            onClick={() => setShowAdvancedFilters(prev => !prev)}
            disabled={!AdvancedFilter}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, md: 2 },
              '&:hover': {
                borderRadius: 1,
                backgroundColor: 'action.hover',
              },
            }}
          >
            <FilterListIcon />
            <Typography>Filtros Avançados</Typography>
          </IconButton>
        </Box>
      </Divider>
      <Collapse in={showAdvancedFilters} timeout="auto">
        <Box display="flex" alignItems="center" gap={{ xs: 1, md: 2 }}>
          {AdvancedFilter}
        </Box>
      </Collapse>
    </Box>
  );
};
