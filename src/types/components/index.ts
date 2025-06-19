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

export const roleHierarchy: Record<UserRole, number> = {
  regular: 0,
  manager: 1,
  admin: 2,
};
