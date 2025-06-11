import type { UserInfo } from '../auth/user';

export interface LoginResponse {
  token: string;
  user: UserInfo;
}

export interface RegisterResponse {
  user: UserInfo;
}
