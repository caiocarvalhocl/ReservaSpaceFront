import { createContext } from 'react';
import { initialState } from './initialState';
import type { UserContextProps } from '../../interfaces/contexts';

const initialStateValue = {
  state: initialState,
  dispatch: () => {},
};

export const UserContext = createContext<UserContextProps>(initialStateValue);
