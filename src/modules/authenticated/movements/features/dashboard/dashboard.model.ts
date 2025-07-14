import { Option } from '@/components/filter/filter.types';
import { useState } from 'react';

export const useMovementDashboardModel = () => {
  const [showAlert, setShowAlert] = useState<boolean>(true);

  const orderOptions: Option[] = [
    { value: 'accountId', label: 'Conta' },
    { value: 'transactionType', label: 'Tipo de Transação' },
    { value: 'category', label: 'Categoria' },
  ];

  const onRegisterClick = () => {
    console.log('onRegisterClick');
  }

  return {
    orderOptions,
    showAlert,
    setShowAlert,
    onRegisterClick,
  };
};
