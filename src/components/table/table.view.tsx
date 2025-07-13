import { Box, Button } from '@mui/material';
import EmptyState from '@/components/empty-state';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import { IPaginatedResponse } from '@/common/types/base-pagination.types';
import React from 'react';

interface ITableViewProps<T> {
  content: IPaginatedResponse<T>;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToPage: (page: number) => void;
  renderItem: (item: T) => React.ReactNode;
  itemSize?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

const defaultItemSize = {
  xs: '100%',
  sm: '100%',
  md: '50%',
  lg: 'calc(100%/3)',
  xl: 'calc(100%/3)',
};

const TableView = <T,>({
  content,
  goToNextPage,
  goToPreviousPage,
  goToPage,
  renderItem,
  itemSize = defaultItemSize,
}: ITableViewProps<T>) => {
  const { meta } = content;
  const currentPage = Number(meta.page);

  if (meta.total === 0) {
    return (
      <EmptyState
        title="Ops, nada por aqui..."
        subtitle="Tente ajustar seus filtros ou adicionar novos registros."
        icon={<HourglassEmptyOutlinedIcon />}
        iconSize="large"
      />
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, md: 2 },
      }}
    >
      {/* Controles de paginação */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'space-between' },
          alignItems: 'center',
          gap: { xs: 1, md: 2 },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          disabled={currentPage === 1}
          onClick={goToPreviousPage}
        >
          Página anterior
        </Button>

        {/* Números de página */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: { xs: 1, md: 2 },
            flexWrap: 'wrap',
          }}
        >
          {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(n => (
            <Button
              key={n}
              size="small"
              variant={n === currentPage ? 'contained' : 'outlined'}
              onClick={() => goToPage(n)}
            >
              {n}
            </Button>
          ))}
        </Box>

        <Button
          variant="contained"
          color="primary"
          disabled={currentPage === meta.totalPages}
          onClick={goToNextPage}
        >
          Próxima página
        </Button>
      </Box>

      {/* Conteúdo da tabela */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {content.data.map((item, index) => (
          <Box
            key={index}
            sx={theme => ({
              width: {
                xs: itemSize.xs ?? defaultItemSize.xs,
                sm: itemSize.sm ?? defaultItemSize.sm,
                md: itemSize.md ?? defaultItemSize.md,
                lg: itemSize.lg ?? defaultItemSize.lg,
                xl: itemSize.xl ?? defaultItemSize.xl,
              },
              p: theme.spacing(0.5),
            })}
          >
            {renderItem(item)}
          </Box>
        ))}
      </Box>

      {/* Números de página para telas pequenas */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          gap: { xs: 1, md: 2 },
          flexWrap: 'wrap',
          mx: 'auto',
        }}
      >
        {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(n => (
          <Button
            key={n}
            size="small"
            variant={n === currentPage ? 'contained' : 'outlined'}
            onClick={() => goToPage(n)}
          >
            {n}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default TableView;
