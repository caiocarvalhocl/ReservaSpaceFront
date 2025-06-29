import sportCourtImg from '../../assets/sportsCourt.jpg';
import coworking from '../../assets/coworking.jpg';
import eventHall from '../../assets/eventHall.jpg';
import meetingRoom from '../../assets/meetingRoom.jpg';
import studio from '../../assets/studio.jpg';
import auditorium from '../../assets/auditorium.jpg';

export const defaultImageByTypeMap: Record<SpaceTypes, string> = {
  sports_court: sportCourtImg,
  coworking: coworking,
  event_hall: eventHall,
  meeting_room: meetingRoom,
  studio: studio,
  auditorium: auditorium,
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
