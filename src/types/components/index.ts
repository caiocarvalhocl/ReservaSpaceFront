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

export const spaceTypeMap: Record<string, string> = {
  auditorium: 'Auditório',
  event_hall: 'Salão de Eventos',
  studio: 'Estúdio',
  coworking: 'Coworking',
  sports_court: 'Quadra Esportiva',
  meeting_room: 'Sala de Reunião',
};

export interface ReservationProps {
  name: string;
  setIsOpen: () => void;
}
