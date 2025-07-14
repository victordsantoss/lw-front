import { useMutation } from '@tanstack/react-query';
import { RegistrationAccountSchema, RegistrationAccountFormValues } from './form.schema';
import { useAlert } from '@/contexts/alert.context';
import { isAxiosError } from 'axios';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { revalidateAccountsDashboard } from '@/modules/authenticated/accounts/actions/revalidate-dashboard.action';
import { AccountService } from '@/modules/authenticated/accounts/services/accounts';
import { Account } from '@/modules/authenticated/accounts/services/accounts/accounts.types';
import { AccountType } from '@/common/enums/account.enum';

export const useRegistrationAccountFormModel = () => {
  const { showAlert } = useAlert();
  const methods = useForm<RegistrationAccountFormValues>({
    resolver: zodResolver(RegistrationAccountSchema),
    defaultValues: {
      name: '',
      accountNumber: '',
      agency: '',
      bankName: '',
      bankCode: '',
      accountType: AccountType.CHECKING,
      balance: 0,
    },
  });

  const { mutateAsync, isPending } = useMutation<
    Account.IRegisterResponse,
    Error,
    Account.IRegisterRequest
  >({
    mutationFn: payload => AccountService.register(payload),
    onError: error => {
      if (isAxiosError(error)) {
        showAlert(error.response?.data.message, 'error');
      } else {
        showAlert('Erro desconhecido', 'error');
      }
    },
    onSuccess: async () => {
      showAlert('Conta registrada com sucesso!', 'success');
      await revalidateAccountsDashboard();
    },
  });

  const onSubmit = async (data: RegistrationAccountFormValues) => {
    await mutateAsync(data);
  };

  return {
    methods,
    onSubmit,
    isPending,
  };
};
