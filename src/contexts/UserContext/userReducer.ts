import type { UserStateModel } from '../../interfaces/models';
import type { UserActionsModel } from '../../types/contexts';
import { UserActions } from './userActions';

export function userReducer(state: UserStateModel, action: UserActionsModel) {
  switch (action.type) {
    case UserActions.LOGIN:
      return { ...state, isLoggedIn: true, user: action.payload };
    case UserActions.LOGOUT:
      console.log('logout');
      return { ...state };
    default:
      return state;
  }
}
