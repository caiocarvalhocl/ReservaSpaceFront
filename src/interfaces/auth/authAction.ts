import type { AuthActions } from '../../contexts/AuthContext/authActions';
import type { UserInfo } from './user';

export interface LoginAction {
  type: AuthActions.LOGIN;
  payload: { user: UserInfo; token: string };
}

export interface LogoutAction {
  type: AuthActions.LOGOUT;
}

export interface SetUserFromStorageAction {
  type: AuthActions.SET_USER_FROM_STORAGE;
  payload: { user: UserInfo; token: string };
}
