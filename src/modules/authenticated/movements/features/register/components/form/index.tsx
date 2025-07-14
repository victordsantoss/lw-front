'use client';

import { useRegisterMovementFormModel } from './form.model';
import RegisterMovementFormView from './form.view';

const RegisterMovementFormViewModel = () => {
  const methods = useRegisterMovementFormModel();

  return <RegisterMovementFormView {...methods} />;
};

export default RegisterMovementFormViewModel;
