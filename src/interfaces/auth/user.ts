import type { AuthActionsModel } from '../../types/auth';
import type { LoginFormProps, RegisterFormProps } from './auth';

export interface UserInfo {
  id: number;
  name: string;
  role: string;
  email?: string;
  status?: string;
}

export interface AuthStateModel {
  user: UserInfo | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}

export interface AuthContextProps {
  state: AuthStateModel;
  dispatch: React.Dispatch<AuthActionsModel>;
  login: ({ email, password }: LoginFormProps) => Promise<boolean>;
  logout: () => void;
  register: ({ email, password, name, phone }: RegisterFormProps) => Promise<boolean>;
}
