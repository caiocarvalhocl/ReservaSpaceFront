import { CalendarDays, ChartColumnIncreasing, CircleCheckBig, DollarSign, Loader, Star, UserRoundCheck, UserRoundMinus, UserRoundX, Users } from 'lucide-react';
import type { SpaceCardProps, UserReservationsProps } from '../interfaces/components';
import type { UserInfo } from '../interfaces/auth/user';

export function getCounters(props: { counterType: 'spaces'; counter: SpaceCardProps[] }): any[];
export function getCounters(props: { counterType: 'reservations'; counter: UserReservationsProps[] }): any[];
export function getCounters(props: { counterType: 'users'; counter: UserInfo[] }): any[];

export function getCounters({ counterType, counter }: { counterType: string; counter: any[] }) {
  const currentMonth = new Date(Date.now()).getUTCMonth();
  const currentYear = new Date().getFullYear();

  if (counterType === 'spaces') {
    let totalMonthly = 0;
    let totalcountersCount = 0;
    const uniqueOccupiedSpacesIds = new Set<number>();

    counter.forEach(space => {
      const reservationDate = new Date(space.reservations[0]?.createdAt);

      if (reservationDate && reservationDate.getUTCMonth() === currentMonth && reservationDate.getFullYear() === currentYear) {
        const isReservationCanceled = space.reservations[0]?.status === 'canceled';

        if (!isReservationCanceled) {
          if (space.price) totalMonthly += +space.price;

          totalcountersCount += space.reservations.length;
          uniqueOccupiedSpacesIds.add(space.id!);
        }
      }
    });

    const formattedMonthly = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalMonthly);
    const totalSpacesRegistered = Array.from(new Set(counter.map(res => res.id))).length;
    const percentageOfOccupiedSpaces = totalSpacesRegistered > 0 ? ((uniqueOccupiedSpacesIds.size / totalSpacesRegistered) * 100).toFixed(2) : 0;

    return [
      {
        title: 'Receita Mensal',
        count: formattedMonthly,
        icon: <DollarSign color='green' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'green',
      },
      {
        title: 'Total de Reservas',
        count: totalcountersCount,
        icon: <CalendarDays color='blue' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'blue',
      },
      {
        title: 'Taxa de Ocupacao',
        count: `${percentageOfOccupiedSpaces}%`,
        icon: <ChartColumnIncreasing color='purple' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'purple',
      },
      {
        title: 'Espaços ativos',
        count: totalSpacesRegistered,
        icon: <CircleCheckBig color='red' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
        color: 'red',
      },
    ];
  }

  if (counterType === 'reservations') {
    const totalMonthly = (counter as UserReservationsProps[])
      .filter(item => {
        const date = new Date(item.startTime);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear && item.status !== 'canceled';
      })
      .reduce((acc, item) => acc + +item.space.price, 0)
      .toFixed(2);

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
        count: `${new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(parseFloat(totalMonthly))}`,
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
