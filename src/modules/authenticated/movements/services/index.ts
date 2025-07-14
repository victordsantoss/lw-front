import { api } from '@/configs/api';
import { Movement } from './movements.types';

export const MovementService = {
  list: async (
    payload: Movement.IListMovementsRequest
  ): Promise<Movement.IListMovementsResponse> => {
    const { data } = await api.get('/movements', { params: payload });
    return data;
  },

  register: async (
    payload: Movement.IRegisterMovementRequest
  ): Promise<Movement.IRegisterMovementResponse> => {
    const { data } = await api.post('/event', payload);
    return data;
  },
};
