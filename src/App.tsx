import { AuthContextProvider } from './contexts/AuthContext/AuthContextProvider';
import { MainRoutes } from './routes/MainRoutes';

export function App() {
  return (
    <div className='bg-cyan-50'>
      <AuthContextProvider>
        <MainRoutes />
      </AuthContextProvider>
    </div>
  );
}
