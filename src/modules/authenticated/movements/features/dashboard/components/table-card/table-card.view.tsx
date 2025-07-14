import {
  Box,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Movement } from '@/modules/authenticated/movements/services/movements.types';
import { Format } from '@/common/utils/format';
import { TRANSACTION_CATEGORY_LABELS } from '@/modules/authenticated/movements/defaults/transaction-categories.defaults';
import { MOVEMENT_TYPE_LABELS } from '@/modules/authenticated/movements/defaults/movement-types.defaults';
import { TransactionCategory } from '@/common/enums/transaction.enum';

interface IMovementTableCardViewProps {
  item: Movement.IListMovementItem;
  anchorEl: HTMLButtonElement | null;
  handleOpenPopover: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClosePopover: () => void;
  open: boolean;
  id: string | undefined;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const MovementTableCardView = ({
  item,
  anchorEl,
  handleOpenPopover,
  handleClosePopover,
  open,
  id,
  onView,
  onEdit,
  onDelete,
}: IMovementTableCardViewProps) => {

  const isTransfer = item.category === TransactionCategory.TRANSFER;

  return (
    <Box
      width="100%"
      bgcolor="background.paper"
      sx={{
        borderRadius: 1,
        boxShadow: 2,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <CardContent sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        <Box width={{ xs: '100%', md: '25%' }}>
          <Typography variant="body2">
            Número da Conta: <span style={{ fontWeight: 'bold' }}>{item.accountNumber}{item.accountName && ` - ${item.accountName}`}</span>
          </Typography>
          {
            isTransfer && (
              <Typography variant="body2">
                Número da Conta Destino: <span style={{ fontWeight: 'bold' }}>{item.destinationAccountNumber}{item.destinationAccountName && ` - ${item.destinationAccountName}`}</span>
              </Typography>
            )
          }
        </Box>
        <Box width={{ xs: '100%', md: '15%' }}>
          <Typography variant="body2">
            Categoria: <Chip label={TRANSACTION_CATEGORY_LABELS[item.category]} color="primary" size="small" variant="outlined" />
          </Typography>
          {
            !isTransfer && (
              <Typography variant="body2">
                Tipo de Transação:   <Chip label={MOVEMENT_TYPE_LABELS[item.transactionType]} color="primary" size="small" />
              </Typography>
            )
          }
          <Typography variant="body2">
            Valor: <span style={{ fontWeight: 'bold' }}>{Format.currency(item.balance)}</span>
          </Typography>
        </Box>
        <Box width={{ xs: '100%', md: '25%' }}>

          <Typography variant="body2">
            Descrição: {item.description}
          </Typography>
        </Box>
        <Box width={{ xs: '100%', md: '15%' }}>
          <Typography variant="body2">
            Data de Processamento: <span style={{ fontWeight: 'bold' }}>{item.processedAt ? Format.date(item.processedAt) : 'Não informado'}</span>
          </Typography>
        </Box>
      </CardContent>
    </Box>
  );
};

export default MovementTableCardView;  
