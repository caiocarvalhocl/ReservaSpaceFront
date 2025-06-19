import { Navigate, useLocation } from 'react-router';
import type { ProtectedRouteProps } from '../../interfaces/components';
import { hasRequiredRole } from '../../utils/authUtils';
import type { UserRole } from '../../types/components';
import { useAuth } from '../../hooks/useAuth';

export function ProtectedRoute({ children, minRole }: ProtectedRouteProps) {
  const location = useLocation();
  const { state } = useAuth();

  const storedToken = localStorage.getItem('authToken');
  const userRole: UserRole = state.user ? (state.user.role as UserRole) : 'regular';

  if (state.isLoading) return <div>Carregando autenticação...</div>;

  if (!storedToken) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  if (minRole && !hasRequiredRole(userRole, minRole)) {
    return <Navigate to='/unauthorized' state={{ from: location }} replace />;
  }

  return children;
}
