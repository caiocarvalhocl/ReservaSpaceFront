import type { UserActions } from '../../contexts/UserContext/userActions';
import type { UserActionsModel } from '../../types/contexts';
import type { UserInfo, UserStateModel } from '../models';

export interface UserContextProps {
  state: UserStateModel;
  dispatch: React.Dispatch<UserActionsModel>;
}

export interface LoginAction {
  type: UserActions.LOGIN;
  payload: UserInfo;
}

export interface LogoutAction {
  type: UserActions.LOGOUT;
}
