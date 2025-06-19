import type { AxiosResponse } from 'axios';
import { api } from './axios';
import type { SpaceCardProps, UserReservationsProps } from '../../interfaces/components';
import type { BookBody, BookResponse } from '../../interfaces/services';
import type { MySpacesResponse, UserResponse } from '../../types/services';

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
