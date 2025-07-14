import { IAccountRegistrationModalControlProps } from './registration-modal.types';
import { AccountRegistrationModalView } from './registration-modal.view';

const AccountRegistrationModalViewModel = ({
  showCreateAccountModal,
  closeCreateAccountModal,
}: IAccountRegistrationModalControlProps) => {
  return (
    <AccountRegistrationModalView
      showCreateAccountModal={showCreateAccountModal}
      closeCreateAccountModal={closeCreateAccountModal}
    />
  );
};

export default AccountRegistrationModalViewModel;
