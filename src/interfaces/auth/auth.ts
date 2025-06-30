import type { UserRole, UserStatus } from '../../types/components';

export interface LoginFormProps {
  email: string;
  password: string;
}

export interface RegisterFormProps {
  email: string;
  password: string;
  phone: string;
  name: string;
  role?: UserRole;
}

export interface UserUpdateRequest {
  id: number;
  name?: string;
  role?: UserRole;
  email?: string;
  status?: UserStatus;
}
