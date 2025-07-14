'use client';

import { AccountDashboardView } from './dashboard.view';
import { useAccountDashboardModel } from './dashboard.model';
import { Account } from '@/modules/authenticated/accounts/services/accounts/accounts.types';

interface IAccountDashboardViewModelProps {
  content: Account.IListAccountsResponse;
}

const AccountDashboardViewModel = ({ content }: IAccountDashboardViewModelProps) => {
  const methods = useAccountDashboardModel();

  return <AccountDashboardView content={content} {...methods} />;
};

export default AccountDashboardViewModel;
