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
import { Account } from '@/modules/authenticated/accounts/services/accounts/accounts.types';
import { Format } from '@/common/utils/format';
import { AccountStatus } from '@/common/enums/account.enum';
import { ACCOUNT_STATUS_LABELS } from '@/modules/authenticated/accounts/defaults/account-status.defaults';
import { ACCOUNT_TYPE_LABELS } from '@/modules/authenticated/accounts/defaults/account-types.defaults';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import PaidIcon from '@mui/icons-material/Paid';
import SummarizeIcon from '@mui/icons-material/Summarize';
interface IAccountTableCardViewProps {
  item: Account.IListAccountItem;
  anchorEl: HTMLButtonElement | null;
  handleOpenPopover: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClosePopover: () => void;
  open: boolean;
  id: string | undefined;
  handleView: (id: string) => void;
  handleAddBalance: (id: string) => void;
  handleTransfer: (id: string) => void;
  handleWithdraw: (id: string) => void;
}

const AccountTableCardView = ({
  item,
  anchorEl,
  handleOpenPopover,
  handleClosePopover,
  open,
  id,
  handleView,
  handleAddBalance,
  handleTransfer,
  handleWithdraw,
}: IAccountTableCardViewProps) => {
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
          <Box display="flex" gap={1}>
            <Chip
              variant="outlined"
              label={ACCOUNT_TYPE_LABELS[item.accountType]}
              color="primary"
              size="small"
            />
            <Chip
              variant="outlined"
              label={ACCOUNT_STATUS_LABELS[item.status]}
              color={item.status === AccountStatus.ACTIVE ? 'success' : 'error'}
              size="small"
            />
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
          <ListItemButton onClick={() => handleView(item.id)}>
            <ListItemIcon>
              <SummarizeIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Visualizar Lançamentos"
              sx={{
                color: 'primary.main',
              }}
            />
          </ListItemButton>
          <ListItemButton onClick={() => handleAddBalance(item.id)}>
            <ListItemIcon>
              <AccountBalanceWalletIcon color="success" />
            </ListItemIcon>
            <ListItemText
              primary="Fazer Depósito"
              sx={{
                color: 'success.main',
              }}
            />
          </ListItemButton>
          <ListItemButton onClick={() => handleTransfer(item.id)}>
            <ListItemIcon>
              <PaidIcon color="warning" />
            </ListItemIcon>
            <ListItemText
              primary="Fazer Transferência"
              sx={{
                color: 'warning.main',
              }}
            />
          </ListItemButton>
          <ListItemButton onClick={() => handleWithdraw(item.id)}>
            <ListItemIcon>
              <MoveDownIcon color="error" />
            </ListItemIcon>
            <ListItemText
              primary="Fazer Saque"
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
