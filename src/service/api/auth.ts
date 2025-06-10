import type { AxiosResponse } from 'axios';
import type { UserInfo } from '../../interfaces/models';
import { api } from './axios';

export async function login({ email, password }: { email: string; password: string }) {
  const response: AxiosResponse<UserInfo> = await api.post('/api/auth/login', {
    email,
    password,
  });

  return response.data;
}

export async function register({ email, password, phone, name }: { email: string; password: string; phone: string; name: string }) {
  const response: AxiosResponse<UserInfo> = await api.post('/api/auth/register', { email, password, name, phone });

  return response.data;
}
