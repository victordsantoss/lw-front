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
import { Account } from '@/modules/authenticated/accounts/services/accounts/accounts.types';
import { Format } from '@/common/utils/format';
import { AccountStatus, AccountType } from '@/common/enums/account.enum';
import { ACCOUNT_STATUS_DESCRIPTIONS, ACCOUNT_STATUS_LABELS } from '@/modules/authenticated/accounts/defaults/account-status.defaults';
import { ACCOUNT_TYPE_LABELS } from '@/modules/authenticated/accounts/defaults/account-types.defaults';

interface IAccountTableCardViewProps {
  item: Account.IListAccountItem;
  anchorEl: HTMLButtonElement | null;
  handleOpenPopover: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClosePopover: () => void;
  open: boolean;
  id: string | undefined;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const AccountTableCardView = ({
  item,
  anchorEl,
  handleOpenPopover,
  handleClosePopover,
  open,
  id,
  onView,
  onEdit,
  onDelete,
}: IAccountTableCardViewProps) => {
  console.log(item);
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
      <CardContent sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h6" fontWeight={700} color="primary">
            {item.accountNumber}
          </Typography>
          <Box display='flex' gap={1}>
            <Chip variant="outlined" label={ACCOUNT_TYPE_LABELS[item.accountType]} color='primary' size='small' />
            <Chip variant="outlined" label={ACCOUNT_STATUS_LABELS[item.status]} color={item.status === AccountStatus.ACTIVE ? 'success' : 'error'} size='small' />
          </Box>
        </Box>
        <Typography variant="body2">
          Agência: <b>{item.agency}</b>
        </Typography>
        <Typography variant="body2">
          Nome ou Apelido da Conta: <b>{item.name || 'Não informado'}</b>
        </Typography>
        <Typography variant="body2">
          Tipo de Conta: <b>{item.accountType}</b>
        </Typography>
        <Typography variant="body2">
          Banco: <b>{item.bankName}</b>
        </Typography>
        <Typography variant="body2">
          Saldo: <b>{Format.currency(item.balance)}</b>
        </Typography>
        <Typography variant="body2">
          Atualizado em: <b>{Format.date(item.updatedAt)}</b>
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleOpenPopover}
          edge="start"
        >
          <MoreVertIcon />
        </IconButton>
      </CardActions>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={() => onView(item.id)}>
            <ListItemIcon>
              <AddShoppingCartIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Fazer pedido"
              sx={{
                color: 'primary.main',
              }}
            />
          </ListItemButton>
          <ListItemButton onClick={() => onView(item.id)} disabled>
            <ListItemIcon>
              <VisibilityIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Visualizar"
              sx={{
                color: 'primary.main',
              }}
            />
          </ListItemButton>
          <ListItemButton onClick={() => onEdit(item.id)} disabled>
            <ListItemIcon>
              <EditIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Editar"
              sx={{
                color: 'primary.main',
              }}
            />
          </ListItemButton>
          <ListItemButton onClick={() => onDelete(item.id)} disabled>
            <ListItemIcon>
              <DeleteIcon color="error" />
            </ListItemIcon>
            <ListItemText
              primary="Excluir"
              sx={{
                color: 'error.main',
              }}
            />
          </ListItemButton>
        </List>
      </Popover>
    </Box>
  );
};

export default AccountTableCardView;
