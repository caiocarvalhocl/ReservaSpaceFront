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
export interface ResourceInfoLayoutProps {
  resources: ResourcesProps[];
}

export interface ReservationProps {
  name: string;
  setIsOpen: () => void;
}

export interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export interface CounterProps {
  icon: React.ReactNode;
  title: string;
  count: string;
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
  createdAt: string;
  updatedAt: string;
  space: SpaceCardProps;
}
