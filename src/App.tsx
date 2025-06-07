import { UserContextProvider } from './contexts/UserContext/UserContextProvider';
import { MainRoutes } from './routes/MainRoutes';

export function App() {
  return (
    <>
      <UserContextProvider>
        <MainRoutes />
      </UserContextProvider>
    </>
  );
}
