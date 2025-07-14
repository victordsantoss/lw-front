import { IFetchErrorResponse, IFetchSuccessResponse } from '@/common/types/fetch.types';
import { apiFetch, handleApiError } from '@/configs/api/ssr-fetch';
import AccountDashboardViewModel from '@/modules/authenticated/accounts/features/dashboard';
import { Account } from '@/modules/authenticated/accounts/services/accounts/accounts.types';

export type AccountDashboardResponse =
  | IFetchSuccessResponse<Account.IListAccountsResponse>
  | IFetchErrorResponse;

export default async function AccountDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const listEndtpoint = '/accounts';
  const filters = await searchParams;

  const [accounts] = await Promise.all([
    await apiFetch<AccountDashboardResponse>(
      listEndtpoint,
      {
        method: 'GET',
        next: {
          tags: ['account-dashboard'],
        },
        cache: 'no-cache',
      },
      filters
    ),
  ]);

  const accountDashboardData = handleApiError<Account.IListAccountsResponse>(accounts);

  return <AccountDashboardViewModel content={accountDashboardData} />;
}
