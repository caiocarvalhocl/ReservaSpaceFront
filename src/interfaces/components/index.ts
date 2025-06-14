export interface SpaceCardProps {
  type: string;
  imageUrl: string | null;
  name: string;
  description: string;
  price: string;
  isAvailable: boolean;
  capacity: number;
  spaceResources: ResourcesProps[];
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

export interface ReservationProps {
  name: string;
  setIsOpen: () => void;
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
}

export interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export interface CounterProps {
  icon: React.ReactNode;
  title: string;
  count: string | number;
  color: string;
}

export interface SearchProps {
  spaces: SpaceCardProps[];
  onChangeSpaceType: (value: string) => void;
  onChangeSearchTerm: (value: string) => void;
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
