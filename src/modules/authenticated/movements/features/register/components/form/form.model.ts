import { useMutation, useQuery } from '@tanstack/react-query';
import { RegisterMovementSchema, RegisterMovementFormValues } from './form.schema';
import { useAlert } from '@/contexts/alert.context';
import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { MovementService } from '@/modules/authenticated/movements/services';
import { Movement } from '@/modules/authenticated/movements/services/movements.types';
import { AccountService } from '@/modules/authenticated/accounts/services/accounts';
import { Account } from '@/modules/authenticated/accounts/services/accounts/accounts.types';
import { useMemo } from 'react';
import { revalidateMovementsDashboard } from '@/modules/authenticated/movements/actions/revalidate-dashboard.action';

export const useRegisterMovementFormModel = () => {
  const { showAlert } = useAlert();
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlType = searchParams.get('type') as 'deposit' | 'withdrawal' | 'transfer' | null;
  const urlAccountId = searchParams.get('accountId');


  const methods = useForm<RegisterMovementFormValues>({
    resolver: zodResolver(RegisterMovementSchema),
    defaultValues: {
      type: urlType || 'deposit',
      origin: urlAccountId || '',
      destination: '',
      balance: undefined,
      description: '',
    },
  });

  const { watch } = methods;
  const watchedType = watch('type');
  const watchedOrigin = watch('origin');

  const { data: accountsData, isLoading: isLoadingAccounts } = useQuery<Account.IListAccountsResponse, Error>({
    queryKey: ['accounts'],
    queryFn: () => AccountService.list({ page: 1, limit: 100 }),
    staleTime: 5 * 60 * 1000,
  });

  const destinationAccounts = useMemo(() => {
    if (!accountsData?.data || !watchedOrigin) {
      return accountsData?.data || [];
    }
    return accountsData.data.filter(account => account.id !== watchedOrigin);
  }, [accountsData?.data, watchedOrigin]);

  const movementTypeOptions = [
    { value: 'deposit', label: 'Depósito' },
    { value: 'withdrawal', label: 'Saque' },
    { value: 'transfer', label: 'Transferência' },
  ];

  const { mutateAsync, isPending } = useMutation<
    Movement.IRegisterMovementResponse,
    Error,
    Movement.IRegisterMovementRequest
  >({
    mutationFn: payload => MovementService.register(payload),
    onError: error => {
      if (isAxiosError(error)) {
        showAlert(error.response?.data.message || 'Erro ao registrar movimentação', 'error');
      } else {
        showAlert('Erro desconhecido', 'error');
      }
    },
    onSuccess: async () => {
      revalidateMovementsDashboard();
      showAlert('Movimentação registrada com sucesso!', 'success');
      router.push('/movements');
    },
  });

  const onSubmit = async (data: RegisterMovementFormValues) => {
    const payload: Movement.IRegisterMovementRequest = {
      type: data.type,
      origin: data.origin,
      balance: data.balance,
      description: data.description,
    };

    if (data.type === 'transfer' && data.destination) {
      payload.destination = data.destination;
    }

    await mutateAsync(payload);
  };

  const onCancel = () => {
    router.push('/movements');
  };

  return {
    methods,
    onSubmit,
    onCancel,
    isPending,
    watchedType,
    movementTypeOptions,
    accountsData: accountsData?.data || [],
    destinationAccounts,
    isLoadingAccounts,
  };
}; 