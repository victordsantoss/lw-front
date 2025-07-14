import { IFetchErrorResponse, IFetchSuccessResponse } from '@/common/types/fetch.types';
import { apiFetch, handleApiError } from '@/configs/api/ssr-fetch';
import MovementDashboardViewModel from '@/modules/authenticated/movements/features/dashboard';
import { Movement } from '@/modules/authenticated/movements/services/movements.types';

export type MovementDashboardResponse =
  | IFetchSuccessResponse<Movement.IListMovementsResponse>
  | IFetchErrorResponse;

export default async function MovementDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const listEndtpoint = '/movements';
  const filters = await searchParams;

  const [movements] = await Promise.all([
    await apiFetch<MovementDashboardResponse>(
      listEndtpoint,
      {
        method: 'GET',
        next: {
          tags: ['movement-dashboard'],
        },
        cache: 'no-cache',
      },
      filters
    ),
  ]);

  const movementDashboardData = handleApiError<Movement.IListMovementsResponse>(movements);

  return <MovementDashboardViewModel content={movementDashboardData} />;
}
