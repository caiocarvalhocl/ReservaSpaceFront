import { AuthContextProvider } from './contexts/AuthContext/AuthContextProvider';
import { MainRoutes } from './routes/MainRoutes';

export function App() {
  return (
    <>
      <AuthContextProvider>
        <MainRoutes />
      </AuthContextProvider>
    </>
  );
}
