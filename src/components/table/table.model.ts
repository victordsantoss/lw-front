import { updateQueryParam } from '@/common/utils/url-param';
import { debounce } from 'lodash';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export interface ITableModelProps {
  /** limite padrão caso não exista na URL */
  limit?: number;
  /** página padrão caso não exista na URL */
  page: number;
}

export const useTableModel = ({ page: defaultPage }: ITableModelProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  /* ---------- estado interno --------------------------------------- */
  const [page, setPage] = useState(Number(searchParams.get('page')) || defaultPage);

  /* ---------- helper genérico (já debounced) ----------------------- */
  const debouncedUpdateQueryParam = useMemo(
    () =>
      debounce(
        (key: string, value: string | null) =>
          updateQueryParam(pathname, searchParams, replace, key, value),
        500
      ),
    [pathname, searchParams, replace]
  );

  /* ---------- efeitos independentes -------------------------------- */
  useEffect(() => {
    debouncedUpdateQueryParam('page', page.toString());
  }, [page, debouncedUpdateQueryParam]);

  /* ---------- funções públicas ------------------------------------ */
  const goToNextPage = () => setPage(p => p + 1);

  const goToPreviousPage = () => setPage(p => (p > 1 ? p - 1 : 1));

  const goToPage = (target: number) => setPage(target > 0 ? target : 1);

  return {
    page,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  };
};
