import { Option } from '@/components/filter/filter.types';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useMovementDashboardModel = () => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState<boolean>(true);

  const orderOptions: Option[] = [
    { value: 'accountId', label: 'Conta' },
    { value: 'transactionType', label: 'Tipo de Transação' },
    { value: 'category', label: 'Categoria' },
  ];

  const onRegisterClick = useCallback(() => {
    router.push('/movements/register');
  }, [router]);

  return {
    orderOptions,
    showAlert,
    setShowAlert,
    onRegisterClick,
  };
};
