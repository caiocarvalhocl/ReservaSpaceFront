import type { UserStateModel } from '../../interfaces/models';
import type { UserActionsModel } from '../../types/contexts';
import { initialUser } from './initialState';
import { UserActions } from './userActions';

export function userReducer(
  state: UserStateModel,
  action: UserActionsModel,
): UserStateModel {
  switch (action.type) {
    case UserActions.LOGIN:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case UserActions.LOGOUT:
      console.log('logout');
      return {
        ...state,
        user: initialUser,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
