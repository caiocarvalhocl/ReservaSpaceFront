import { Activity, CalendarDays, ChartColumnIncreasing, CircleCheckBig, DollarSign, Loader, Star, UserRoundCheck, UserRoundMinus, UserRoundX, Users } from 'lucide-react';
import type { SpaceCardProps, UserReservationsProps } from '../interfaces/components';
import type { UserInfo } from '../interfaces/auth/user';

export function getCounters(props: { counterType: 'spaces'; counter: SpaceCardProps[] }): any[];
export function getCounters(props: { counterType: 'reservations'; counter: UserReservationsProps[] }): any[];
export function getCounters(props: { counterType: 'users'; counter: UserInfo[] }): any[];

export function getCounters({ counterType, counter }: { counterType: string; counter: any[] }) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  if (counterType === 'spaces') {
    return [
      {
        title: 'Receita Mensal',
        count: `R$${(counter as SpaceCardProps[])
          .filter(item => {
            const date = new Date();
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear && item.status !== 'canceled';
          })
          .reduce((acc, item) => acc + +item.price, 0)
          .toFixed(2)}`,
        icon: <DollarSign color='green' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'green',
      },
      {
        title: 'Total de Reservas',
        count: (counter as SpaceCardProps[]).reduce((acc, item) => (item.status === 'completed' ? acc + 1 : acc), 0),
        icon: <CalendarDays color='blue' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'blue',
      },
      {
        title: 'Taxa de Ocupacao',
        count: 0,
        icon: <ChartColumnIncreasing color='purple' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'purple',
      },
      {
        title: 'Espaços ativos',
        count: (counter as SpaceCardProps[]).reduce((acc, item) => (item.status === 'pending' ? acc + 1 : acc), 0),
        icon: <CircleCheckBig color='red' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'red',
      },
    ];
  }

  if (counterType === 'reservations') {
    const reservationCounters = [
      {
        title: 'Total',
        count: counter.length,
        icon: <CalendarDays color='blue' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'blue',
      },
      {
        title: 'Concluidas',
        count: (counter as UserReservationsProps[]).reduce((acc, item) => (item.status === 'completed' ? acc + 1 : acc), 0),
        icon: <Star color='green' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'green',
      },
      {
        title: 'Pendentes',
        count: (counter as UserReservationsProps[]).reduce((acc, item) => (item.status === 'pending' ? acc + 1 : acc), 0),
        icon: <Loader color='cyan' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'cyan',
      },
      {
        title: 'Confirmadas',
        count: (counter as UserReservationsProps[]).reduce((acc, item) => (item.status === 'confirmed' ? acc + 1 : acc), 0),
        icon: <CircleCheckBig color='blue' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'blue',
      },
      {
        title: 'Este Mês',
        count: `R$${(counter as UserReservationsProps[])
          .filter(item => {
            const date = new Date(item.startTime);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear && item.status !== 'canceled';
          })
          .reduce((acc, item) => acc + +item.space.price, 0)
          .toFixed(2)}`,
        icon: <CalendarDays color='purple' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'purple',
      },
    ];
    return reservationCounters;
  }

  if (counterType === 'users') {
    const reservationCounters = [
      {
        title: 'Total',
        count: counter.length,
        icon: <Users color='blue' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'blue',
      },
      {
        title: 'Usuários Ativos',
        count: (counter as UserInfo[]).reduce((acc, item) => (item.status === 'active' ? acc + 1 : acc), 0),
        icon: <UserRoundCheck color='green' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'green',
      },

      {
        title: 'Usuários Inativos',
        count: (counter as UserInfo[]).reduce((acc, item) => (item.status === 'inactive' ? acc + 1 : acc), 0),
        icon: <UserRoundMinus color='gray' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'gray',
      },

      {
        title: 'Usuários Suspensos',
        count: (counter as UserInfo[]).reduce((acc, item) => (item.status === 'suspend' ? acc + 1 : acc), 0),
        icon: <UserRoundX color='red' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'red',
      },
    ];
    return reservationCounters;
  }

  return [];
}
