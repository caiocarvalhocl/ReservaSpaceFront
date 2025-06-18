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
