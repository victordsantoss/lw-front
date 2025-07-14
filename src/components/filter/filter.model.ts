import { SortOptionsValues, SortOptionsLabels } from '@/common/enums/order-options.enum';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { updateQueryParam } from '@/common/utils/url-param';
import { Option } from './filter.types';

export interface FilterState {
  search: string;
  sortBy: Option | null;
  orderBy: Option | null;
}

const sortOptions: Option[] = [
  { value: SortOptionsValues.ASC, label: SortOptionsLabels.ASC },
  { value: SortOptionsValues.DESC, label: SortOptionsLabels.DESC },
];

interface IUseFilterModelProps {
  orderOptions: Option[];
}

export const useFilterModel = ({ orderOptions }: IUseFilterModelProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    search: searchParams.get('search') || '',
    sortBy: sortOptions.find(option => option.value === searchParams.get('sortBy')) || null,
    orderBy: orderOptions.find(option => option.value === searchParams.get('orderBy')) || null,
  });

  const debouncedUpdateQueryParam = useMemo(
    () =>
      debounce(
        (key: string, value: string | null) =>
          updateQueryParam(pathname, searchParams, replace, key, value),
        500
      ),
    [pathname, searchParams, replace]
  );

  return {
    sortOptions,
    orderOptions,
    filterState,
    setFilterState,
    debouncedUpdateQueryParam,
    setShowAdvancedFilters,
    showAdvancedFilters,
  };
};
