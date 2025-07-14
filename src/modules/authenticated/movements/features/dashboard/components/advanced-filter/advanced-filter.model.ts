import { useMemo, useState } from 'react';
import { TransactionCategory } from '@/common/enums/transaction.enum';
import { TRANSACTION_CATEGORY_LABELS } from '@/modules/authenticated/movements/defaults';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { debounce } from 'lodash';
import { updateQueryParam } from '@/common/utils/url-param';
import { useQuery } from '@tanstack/react-query';
import { AccountService } from '@/modules/authenticated/accounts/services/accounts';
import { Account } from '@/modules/authenticated/accounts/services/accounts/accounts.types';

export interface IFilterState {
  category: string | null;
  transactionType: string | null;
  accountId: string | null;
}

export const useAdvancedFilterModel = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState<IFilterState>({
    category: searchParams.get('category') || '',
    transactionType: searchParams.get('transactionType') || '',
    accountId: searchParams.get('accountId') || '',
  });

  const { data: accountsData } = useQuery<Account.IListAccountsResponse, Error>({
    queryKey: ['accounts'],
    queryFn: () => AccountService.list({ page: 1, limit: 100 }),
    staleTime: 5 * 60 * 1000,
  });

  const handleFilterChange = (field: keyof IFilterState, value: string | null) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: null,
      transactionType: null,
      accountId: null,
    });
  };

  const debouncedUpdateQueryParam = useMemo(
    () =>
      debounce(
        (key: string, value: string | null) =>
          updateQueryParam(pathname, searchParams, replace, key, value),
        500
      ),
    [pathname, searchParams, replace]
  );

  const categoryOptions = Object.values(TransactionCategory).map(category => ({
    value: category,
    label: TRANSACTION_CATEGORY_LABELS[category],
  }));

  return {
    filters,
    handleFilterChange,
    handleClearFilters,
    categoryOptions,
    debouncedUpdateQueryParam,
    accountsData: accountsData?.data || [],
  };
};
