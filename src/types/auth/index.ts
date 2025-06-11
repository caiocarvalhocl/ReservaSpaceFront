import type { LoginAction, LogoutAction, SetUserFromStorageAction } from '../../interfaces/auth/authAction';

export type AuthActionsModel = LoginAction | LogoutAction | SetUserFromStorageAction;
