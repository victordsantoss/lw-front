import { Box } from '@mui/material';

import FilterViewModel from '@/components/filter';
import { Option } from '@/components/filter/filter.types';

import { Movement } from '../../services/movements.types';
import TableViewModel from '@/components/table';
import MovementTableCardViewModel from './components/table-card';
import AdvancedFilterViewModel from './components/advanced-filter';

interface IMovementDashboardViewProps {
  content: Movement.IListMovementsResponse;
  orderOptions: Option[];
  onRegisterClick: () => void;
}

export const MovementDashboardView = ({
  content,
  orderOptions,
  onRegisterClick,
}: IMovementDashboardViewProps) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={{ xs: 1, md: 2 }}>
      <Box display={'flex'} width={'100%'} gap={{ xs: 1, md: 2 }}>
        <FilterViewModel
          searchPlaceholder="Pesquisar por Nome ou Número da Conta"
          onRegisterClick={onRegisterClick}
          orderOptions={orderOptions}
          AdvancedFilter={<AdvancedFilterViewModel />}
        />
      </Box>

      <TableViewModel
        renderItem={(item: Movement.IListMovementItem) => (
          <MovementTableCardViewModel item={item} />
        )}
        content={content}
        itemSize={{
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100%',
        }}
      />
    </Box>
  );
};
