import { Navigate, useLocation } from 'react-router';
import type { ProtectedRouteProps } from '../../interfaces/components';

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const storedToken = localStorage.getItem('authToken');

  if (!storedToken) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return children;
}
