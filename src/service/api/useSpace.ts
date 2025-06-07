import type { AxiosResponse } from 'axios';
import type { SpaceCardProps } from '../../types/components';
import { api } from './axios';

export async function getSpaces() {
  const response: AxiosResponse<SpaceCardProps[]> =
    await api.get('api/spaces/');

  return response.data;
}
