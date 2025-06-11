import { createContext } from 'react';
import type { AuthContextProps } from '../../interfaces/auth/user';

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
