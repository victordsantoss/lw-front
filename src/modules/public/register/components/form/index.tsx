import { useRegisterFormModel } from './form.model';
import { RegisterFormView } from './form.view';

const RegisterFormViewModel = () => {
  const registerFormMethods = useRegisterFormModel();
  return <RegisterFormView {...registerFormMethods} />;
};

export default RegisterFormViewModel;
