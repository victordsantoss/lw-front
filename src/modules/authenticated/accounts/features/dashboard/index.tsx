'use client';

import { IPaginatedResponse } from '@/common/types/base-pagination.types';
import { AccountModel } from '@/common/models/account.model';
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
