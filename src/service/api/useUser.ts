import type { AxiosResponse } from 'axios';
import type { UserStateModel } from '../../interfaces/models';
import { api } from './axios';

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response: AxiosResponse<UserStateModel> = await api.post(
    '/api/users/login',
    { email, password },
  );

  return response.data;
}

export async function register({
  email,
  password,
  phone,
  name,
}: {
  email: string;
  password: string;
  phone: string;
  name: string;
}) {
  const response: AxiosResponse<UserStateModel> = await api.post(
    '/api/users/register',
    { email, password, name, phone },
  );

  return response.data;
}
