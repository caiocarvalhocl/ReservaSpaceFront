import type { ReservationStatus, SpaceStatus, SpaceTypes } from '../../types/components';
import type { UserInfo } from '../auth/user';

export interface LoginResponse {
  token: string;
  user: UserInfo;
}

export interface RegisterResponse {
  user: UserInfo;
}

export interface BookBody {
  spaceId: number;
  startTime: string;
  endTime: string;
}

export interface BookResponse {
  message: string;
}

export interface SpaceFormRequest {
  type: SpaceTypes;
  imageUrl: string | null;
  name: string;
  description: string;
  price: number;
  capacity: number;
  status: SpaceStatus;
}

export interface SpaceFormResponse {
  status: SpaceStatus;
}

export interface ReservationUpdateRequest {
  id?: number;
  status: ReservationStatus;
}
