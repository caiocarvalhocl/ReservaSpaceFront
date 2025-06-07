import type { UserActions } from '../../contexts/UserContext/userActions';
import type { UserActionsModel } from '../../types/contexts';
import type { UserStateModel } from '../models';

export interface UserContextProps {
  state: UserStateModel;
  dispatch: React.Dispatch<UserActionsModel>;
}

export interface LoginAction {
  type: UserActions.LOGIN;
  payload: UserStateModel;
}

export interface LogoutAction {
  type: UserActions.LOGOUT;
}
