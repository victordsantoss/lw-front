import { Option } from '@/components/filter/filter.types';
import { useState } from 'react';

export const useAccountDashboardModel = () => {
  const [showAlert, setShowAlert] = useState<boolean>(true);

  const [showCreateAccountModal, setShowCreateAccountModal] = useState<boolean>(false);

  const orderOptions: Option[] = [
    { value: 'balance', label: 'Saldo' },
    { value: 'updatedAt', label: 'Última Atualização' },
  ];

  const onRegisterClick = () => setShowCreateAccountModal(true);
  const closeCreateAccountModal = () => setShowCreateAccountModal(false);

  return {
    orderOptions,
    onRegisterClick,
    showAlert,
    setShowAlert,
    showCreateAccountModal,
    setShowCreateAccountModal,
    closeCreateAccountModal,
  };
};
