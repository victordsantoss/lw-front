'use client';

import { RegisterMovementView } from './register.view';
import { useRegisterMovementModel } from './register.model';

const MovementRegisterViewModel = () => {
  const methods = useRegisterMovementModel();

  return <RegisterMovementView {...methods} />;
};

export default MovementRegisterViewModel; 