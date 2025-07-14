import { useLoginFormModel } from './form.model';
import LoginFormView from './form.view';

const LoginFormViewModel = () => {
  const loginFormMethods = useLoginFormModel();
  return <LoginFormView {...loginFormMethods} />;
};

export default LoginFormViewModel;
