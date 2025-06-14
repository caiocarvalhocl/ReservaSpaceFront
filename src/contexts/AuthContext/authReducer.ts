import type { AuthStateModel } from '../../interfaces/auth/user';
import type { AuthActionsModel } from '../../types/auth';
import { AuthActions } from './authActions';

export function authReducer(state: AuthStateModel, action: AuthActionsModel) {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isLoggedIn: false,
      };
    case AuthActions.SET_USER_FROM_STORAGE:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };
    default:
      return state;
  }
}
