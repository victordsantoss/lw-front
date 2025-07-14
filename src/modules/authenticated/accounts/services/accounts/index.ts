import { api } from '@/configs/api';
import { Account } from './accounts.types';

export const AccountService = {
  register: async (payload: Account.IRegisterRequest): Promise<Account.IRegisterResponse> => {
    const { data } = await api.post('/accounts/create', payload);
    return data;
  },
  list: async (payload: Account.IListAccountsRequest): Promise<Account.IListAccountsResponse> => {
    const { data } = await api.get('/accounts', { params: payload });
    return data;
  },
};
