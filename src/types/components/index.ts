export const defaultImageByTypeMap: Record<SpaceTypes, string> = {
  sports_court: '../../../public/zetong-li-CkPACFj8IXY-unsplash.jpg',
  coworking: '../../../public/helena-lopes-1m2LQEonm2A-unsplash.jpg',
  event_hall: '../../../public/ibrahim-boran-m8YjB0noWiY-unsplash.jpg',
  meeting_room: '../../../public/benjamin-child-GWe0dlVD9e0-unsplash.jpg',
  studio: '../../../public/alexander-dummer-aS4Duj2j7r4-unsplash.jpg',
  auditorium: '../../../public/asia-culturecenter-COWf-5ZtZ6w-unsplash.jpg',
};

export const spaceTypeMap: Record<string, string> = {
  auditorium: 'Auditório',
  event_hall: 'Salão de Eventos',
  studio: 'Estúdio',
  coworking: 'Coworking',
  sports_court: 'Quadra Esportiva',
  meeting_room: 'Sala de Reunião',
};

export const spaceStatusMap: Record<string, string> = {
  active: 'ativo',
  maintenance: 'manutenção',
  inactive: 'inativo',
};

export type SpaceTypes = keyof typeof spaceTypeMap;
export type SpaceStatus = keyof typeof spaceStatusMap;

export type LastReservation = {
  createdAt: string;
  status: ReservationStatus;
  id: number;
};

export type UserRole = 'admin' | 'manager' | 'regular';
export type UserStatus = 'active' | 'inactive' | 'suspend';
export type ReservationStatus = 'completed' | 'confirmed' | 'pending' | 'canceled';

export const roleHierarchy: Record<UserRole, number> = {
  regular: 0,
  manager: 1,
  admin: 2,
};

export const userRolesMap: Record<UserRole, string> = {
  regular: 'cliente',
  manager: 'gerente',
  admin: 'administrador',
};

export const userStatusMap: Record<UserStatus, string> = {
  active: 'ativo',
  inactive: 'inativo',
  suspend: 'suspenso',
};

export const reservationStatusMap: Record<ReservationStatus, string> = {
  completed: 'concluida',
  confirmed: 'confirmada',
  pending: 'pendente',
  canceled: 'cancelada',
};

export type FilterFieldType = 'text' | 'select';
