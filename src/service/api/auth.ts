import type { AxiosResponse } from 'axios';
import { api } from './axios';
import type { LoginResponse, RegisterResponse } from '../../interfaces/services';
import type { LoginFormProps, RegisterFormProps } from '../../interfaces/auth/auth';

export async function login({ email, password }: LoginFormProps) {
  const response: AxiosResponse<LoginResponse> = await api.post('/api/auth/login', {
    email,
    password,
  });

  return response.data;
}

export async function register({ email, password, phone, name }: RegisterFormProps) {
  const response: AxiosResponse<RegisterResponse> = await api.post('/api/auth/register', { email, password, name, phone });

  return response.data;
}
