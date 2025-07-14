import RegistrationAccountFormView from './form.view';
import { useRegistrationAccountFormModel } from './form.model';

interface RegistrationAccountFormViewModelProps {
  closeCreateAccountModal: () => void;
}

const RegistrationAccountFormViewModel = ({
  closeCreateAccountModal,
}: RegistrationAccountFormViewModelProps) => {
  const methods = useRegistrationAccountFormModel();
  return (
    <RegistrationAccountFormView closeCreateAccountModal={closeCreateAccountModal} {...methods} />
  );
};

export default RegistrationAccountFormViewModel;
