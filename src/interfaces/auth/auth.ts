import type { UserRole } from '../../types/components';

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
  role?: string;
  email?: string;
  status?: string;
}
