import { Alert, Box, IconButton, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import FilterViewModel from '@/components/filter';
import { Option } from '@/components/filter/filter.types';
import TableViewModel from '@/components/table';
import AccountTableCardViewModel from './components/table-card';
import CloseIcon from '@mui/icons-material/Close';
import dynamic from 'next/dynamic';
import { Account } from '@/modules/authenticated/accounts/services/accounts/accounts.types';

const AccountRegistrationModalViewModel = dynamic(
  () => import('../../components/registration-modal'),
  {
    ssr: false,
  }
);

interface IAccountDashboardViewProps {
  content: Account.IListAccountsResponse;
  orderOptions: Option[];
  onRegisterClick: () => void;
  showAlert: boolean;
  setShowAlert: (showAlert: boolean) => void;
  showCreateAccountModal: boolean;
  closeCreateAccountModal: () => void;
}

export const AccountDashboardView = ({
  content,
  orderOptions,
  onRegisterClick,
  showAlert,
  setShowAlert,
  showCreateAccountModal,
  closeCreateAccountModal,
}: IAccountDashboardViewProps) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={{ xs: 1, md: 2 }}>
      {showAlert && (
        <Alert
          severity="info"
          icon={<InfoOutlinedIcon />}
          sx={{ mb: 3 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setShowAlert(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Informação sobre Contas
          </Typography>
          <Typography variant="body2">
            Esta é a lista de contas bancárias disponíveis. Para acessar as transações, é necessário
            selecionar uma conta e visualizar seu detalhamento.
          </Typography>
        </Alert>
      )}
      <Box display={'flex'} width={'100%'} gap={{ xs: 1, md: 2 }}>
        <FilterViewModel
          searchPlaceholder="Pesquisar por Nome, Número, Agência ou Banco"
          onRegisterClick={onRegisterClick}
          orderOptions={orderOptions}
        />
      </Box>

      <TableViewModel
        renderItem={(item: Account.IListAccountItem) => <AccountTableCardViewModel item={item} />}
        content={content}
      />
      <AccountRegistrationModalViewModel
        showCreateAccountModal={showCreateAccountModal}
        closeCreateAccountModal={closeCreateAccountModal}
      />
    </Box>
  );
};
