import { api } from '@/configs/api';
import { Movement } from './movements.types';

export const MovementService = {
  list: async (payload: Movement.IListMovementsRequest): Promise<Movement.IListMovementsResponse> => {
    const { data } = await api.get('/movements', { params: payload });
    return data;
  },
};
