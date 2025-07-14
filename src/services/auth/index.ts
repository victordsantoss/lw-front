import { api } from '@/configs/api';
import { Auth } from './auth.types';

export const AuthService = {
  register: async (payload: Auth.IRegisterRequest): Promise<Auth.IRegisterResponse> => {
    const { data } = await api.post('/user', payload);
    return data;
  },
  login: async ({ email, password }: Auth.ILoginRequest): Promise<string> => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },
  logout: async (): Promise<boolean> => {
    const { data } = await api.post('/auth/logout');
    return data;
  },
};
