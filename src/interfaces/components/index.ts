import type { FilterFieldType, LastReservation, UserRole } from '../../types/components';
import type { UserInfo } from '../auth/user';

export interface NavItem {
  path: string;
  title: string;
  minRole?: UserRole;
  loggedInOnly?: boolean;
  loggedOutOnly?: boolean;
  onClick?: () => void;
  isUserDisplay?: boolean;
  isLogout?: boolean;
}

export interface SpaceCardProps {
  id: number;
  type: string;
  imageUrl: string | null;
  name: string;
  description: string;
  price: string;
  capacity: number;
  reservations?: LastReservation[];
  spaceResources?: ResourcesProps[];
  isAvailable?: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResourcesProps {
  quantity: number;
  resource: {
    id: number;
    description: string;
    name: string;
  };
}
export interface TagListProps {
  items: string[] | ResourcesProps[];
  type: 'status' | 'resource';
  maxVisible?: number;
}

export interface BookProps {
  name: string;
  setIsOpen: () => void;
  spaceId: number;
}

export interface ReseravationCardProps {
  id: number;
  type: string;
  imageUrl: string | null;
  name: string;
  description: string;
  price: string;
  status: string;
  capacity: number;
  spaceResources: ResourcesProps[];
  startTime: Date;
  endTime: Date;
}

export interface ProtectedRouteProps {
  children?: React.ReactNode;
  minRole: UserRole;
}

export interface CounterProps {
  icon: React.ReactNode;
  title: string;
  count: string | number;
  color: string;
}

export interface FilterField {
  name: string;
  label: string;
  type: FilterFieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export interface SearchProps {
  filters: FilterField[];
  onFilterChange: (fieldName: string, value: string) => void;
}

export interface UserReservationsProps {
  id: number;
  spaceId: number;
  userId: number;
  startTime: Date;
  endTime: Date;
  status: string;
  space: SpaceCardProps;
}

export interface UserCardProps {
  userInfo: UserInfo;
  fields: string[];
  onChangeCheckBox: (id: number, isChecked: boolean) => void;
  isSelected: boolean;
}
