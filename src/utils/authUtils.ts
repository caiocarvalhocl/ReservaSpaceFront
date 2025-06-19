import { roleHierarchy, type UserRole } from '../types/components';

export function hasRequiredRole(userRole: UserRole, minRole?: UserRole): boolean {
  if (!minRole) return true;

  return roleHierarchy[userRole] >= roleHierarchy[minRole];
}
