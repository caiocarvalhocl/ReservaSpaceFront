export const spaceTypeMap: Record<string, string> = {
  auditorium: 'Auditório',
  event_hall: 'Salão de Eventos',
  studio: 'Estúdio',
  coworking: 'Coworking',
  sports_court: 'Quadra Esportiva',
  meeting_room: 'Sala de Reunião',
};

export type LastReservation = {
  createdAt: string;
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
