import { useEffect, useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { AuthActions } from './authActions';
import { login as apiLogin } from '../../service/api/auth';
import { register as apiRegister } from '../../service/api/auth';
import type { AuthContextProps, AuthStateModel, UserInfo } from '../../interfaces/auth/user';
import type { LoginFormProps, RegisterFormProps } from '../../interfaces/auth/auth';

const initialState: AuthStateModel = {
  user: null,
  token: null,
  isLoggedIn: false,
};

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUserFromStorage = () => {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');

      if (storedUser && storedToken) {
        try {
          const user: UserInfo = JSON.parse(storedUser);

          dispatch({ type: AuthActions.SET_USER_FROM_STORAGE, payload: { user, token: storedToken } });
        } catch (e) {
          console.error('Failed to parse user from localStorage', e);
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          dispatch({ type: AuthActions.LOGOUT });
        }
      }
    };

    loadUserFromStorage();

    const handleLogoutEvent = () => dispatch({ type: AuthActions.LOGOUT });

    window.addEventListener('logout', handleLogoutEvent);

    return () => window.removeEventListener('logout', handleLogoutEvent);
  }, []);

  const login = async ({ email, password }: LoginFormProps) => {
    try {
      const { user, token } = await apiLogin({ email, password });

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({ type: AuthActions.LOGIN, payload: { user, token } });

      return true;
    } catch (error) {
      console.error(error);
      dispatch({ type: AuthActions.LOGOUT });
      return false;
    }
  };

  const register = async ({ email, password, name, phone }: RegisterFormProps) => {
    try {
      const { user } = await apiRegister({ email, password, name, phone });

      if (!user) return false;

      return true;
    } catch (error) {
      console.error(error);
      dispatch({ type: AuthActions.LOGOUT });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    dispatch({ type: AuthActions.LOGOUT });
  };

  const contextValue: AuthContextProps = { state, dispatch, login, register, logout };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
