import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { IAccountRegistrationModalControlProps } from './registration-modal.types';
import RegistrationAccountFormViewModel from './components/form';

export const AccountRegistrationModalView = ({
  showCreateAccountModal,
  closeCreateAccountModal,
}: IAccountRegistrationModalControlProps) => {
  return (
    <Dialog
      open={showCreateAccountModal}
      onClose={closeCreateAccountModal}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: {
          minWidth: { xs: '90vw', sm: '40vw', md: '40vw' },
          maxWidth: { xs: '95vw', sm: '60vw', md: '50vw' },
        },
      }}
    >
      <DialogTitle>
        <Typography color="primary" gutterBottom fontSize={28} fontWeight={600}>
          Cadastrar Conta
        </Typography>
        <Typography variant="body2" color="primary">
          Adicione uma nova conta bancária para gerenciar suas transações.
        </Typography>
      </DialogTitle>
      <DialogContent>
        <RegistrationAccountFormViewModel closeCreateAccountModal={closeCreateAccountModal} />
      </DialogContent>
    </Dialog>
  );
};
