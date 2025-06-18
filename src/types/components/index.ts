export const spaceTypeMap: Record<string, string> = {
  auditorium: 'Auditório',
  event_hall: 'Salão de Eventos',
  studio: 'Estúdio',
  coworking: 'Coworking',
  sports_court: 'Quadra Esportiva',
  meeting_room: 'Sala de Reunião',
};

export const rolesMap: Record<string, string> = {
  admin: 'admin',
  manager: 'manager',
  regular: 'regular',
};

export type LastReservation = {
  createdAt: string;
};
