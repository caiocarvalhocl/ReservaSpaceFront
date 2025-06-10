import type { AxiosResponse } from 'axios';
import { api } from './axios';
import type { SpaceCardProps, UserReservationsProps } from '../../interfaces/components';

export async function getMyReservations() {
  const response: AxiosResponse<UserReservationsProps[]> = await api.get(`api/reservations/my`);

  return response.data;
}

export async function getSpaces() {
  const response: AxiosResponse<SpaceCardProps[]> = await api.get('api/spaces/');

  return response.data;
}
