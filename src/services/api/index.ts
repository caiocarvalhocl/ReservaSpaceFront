import type { AxiosResponse } from 'axios';
import { api } from './axios';
import type { SpaceCardProps, UserReservationsProps } from '../../interfaces/components';
import type { BookBody, BookResponse, RegisterResponse } from '../../interfaces/services';
import type { MySpacesResponse, UserResponse, UserUpdate } from '../../types/services';
import type { RegisterFormProps } from '../../interfaces/auth/auth';

export async function getMyReservations() {
  const response: AxiosResponse<UserReservationsProps[]> = await api.get(`api/reservations/my`);

  return response.data;
}

export async function getSpaces() {
  const response: AxiosResponse<SpaceCardProps[]> = await api.get('api/spaces/');

  return response.data;
}

export async function book({ spaceId, startTime, endTime }: BookBody) {
  const response: AxiosResponse<BookResponse> = await api.post('api/reservations/', { spaceId, startTime, endTime });

  return response.data;
}

export async function getMySpaces() {
  const response: AxiosResponse<MySpacesResponse> = await api.get('/api/spaces/my');

  return response.data;
}

export async function getAllUsers() {
  const response: AxiosResponse<UserResponse> = await api.get('/api/users/');

  return response.data;
}

export async function updateMultipleUsers(users: UserUpdate) {
  const response: AxiosResponse<UserUpdate> = await api.patch(`/api/users/`, users);

  return response.data;
}

export async function createUser(user: RegisterFormProps) {
  const response: AxiosResponse<RegisterResponse> = await api.post('api/users/', user);

  return response.data;
}
