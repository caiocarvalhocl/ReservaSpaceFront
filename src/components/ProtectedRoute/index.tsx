import { Navigate, useLocation } from 'react-router';
import type { ProtectedRouteProps } from '../../interfaces/components';

export function ProtectedRoute({ children, isLoggedIn }: ProtectedRouteProps) {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return children;
}
