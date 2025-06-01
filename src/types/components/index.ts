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
