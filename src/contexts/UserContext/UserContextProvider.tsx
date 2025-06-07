import { useReducer } from 'react';
import { initialState } from './initialState';
import { UserContext } from './UserContext';
import { userReducer } from './userReducer';

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
