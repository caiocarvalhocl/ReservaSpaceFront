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
  isLoggedIn: boolean;
  children?: React.ReactNode;
}
