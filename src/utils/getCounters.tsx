import { CalendarDays, Loader } from 'lucide-react';
import { CircleCheckBig } from 'lucide-react';
import { Star } from 'lucide-react';
import type { UserReservationsProps } from '../interfaces/components';

interface CountersProps {
  filteredReservations: UserReservationsProps[];
}

export function getCounters({ filteredReservations }: CountersProps) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const counters = [
    {
      title: 'Total',
      count: filteredReservations.length,
      icon: <CalendarDays color='blue' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
      color: 'blue',
    },

    {
      title: 'Concluidas',
      count: filteredReservations.reduce((acc, item) => (item.status === 'concluida' ? acc + 1 : acc), 0),
      icon: <Star color='green' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
      color: 'green',
    },

    {
      title: 'Pendentes',
      count: filteredReservations.reduce((acc, item) => (item.status === 'pendente' ? acc + 1 : acc), 0),
      icon: <Loader color='cyan' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
      color: 'cyan',
    },

    {
      title: 'Confirmadas',
      count: filteredReservations.reduce((acc, item) => (item.status === 'confirmada' ? acc + 1 : acc), 0),
      icon: <CircleCheckBig color='blue' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
      color: 'blue',
    },

    {
      title: 'Este Mês',
      count: `R$${filteredReservations
        .filter(item => {
          const date = new Date(item.startTime);
          return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        })
        .reduce((acc, item) => acc + +item.space.price, 0)}`,
      icon: <CalendarDays color='purple' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />,
      color: 'purple',
    },
  ];

  return counters;
}
