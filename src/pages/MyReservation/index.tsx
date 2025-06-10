import { CalendarDays } from 'lucide-react';
import { Counter } from '../../components/Counter';
import { Layout } from '../../components/Layout';
import { CircleCheckBig } from 'lucide-react';
import { Star } from 'lucide-react';
import { Search } from '../../components/Search';
import { useEffect, useState } from 'react';
import type { UserReservationsProps } from '../../interfaces/components';
import { getMyReservations } from '../../service/api/useReservation';

export function MyReservation() {
  const [reservations, setReservations] = useState<UserReservationsProps[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<UserReservationsProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [spaceType, setSpaceType] = useState('all');

  // useEffect(() => {
  //   let filtered = reservations;
  //
  //   if (spaceType !== 'all') {
  //     filtered = filtered.filter(res => res.space.type === spaceType);
  //   }
  //
  //   if (searchTerm.trim() !== '') {
  //     filtered = filtered.filter(res => res.space.name.toLowerCase().includes(searchTerm.toLowerCase()));
  //   }
  //
  //   setFilteredReservations(filtered);
  // }, [spaceType, searchTerm, reservations]);

  const handleSpaceType = (type: string) => setSpaceType(type);

  const counters = [
    {
      title: 'Total',
      count: '5',
      icon: <CalendarDays color='blue' size={35} />,
      color: 'blue',
    },

    {
      title: 'Proximas',
      count: '3',
      icon: <CircleCheckBig color='green' size={35} />,
      color: 'green',
    },

    {
      title: 'Concluidas',
      count: '2',
      icon: <Star color='blue' size={35} />,
      color: 'blue',
    },

    {
      title: 'Este Mes',
      count: 'R$ 1.090',
      icon: <CalendarDays color='purple' size={35} />,
      color: 'purple',
    },
  ];

  return (
    <Layout>
      <div className='bg-cyan-50 min-h-screen'>
        <div className='p-6'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-5xl lg:text-7xl font-bold'>Minhas Reservas</h1>
            <p className='text-2xl lg:text-5xl text-gray-600'>Gerencie todas as suas reservas de espaços</p>
          </div>
          <div className='flex flex-col gap-8 my-8'>
            {counters.map((counter, index) => (
              <Counter key={index} title={counter.title} count={counter.count} icon={counter.icon} color={counter.color} />
            ))}
          </div>

          <div>
            <Search onChangeSearchTerm={setSearchTerm} onChangeSpaceType={handleSpaceType} spaces={reservations.map(reservation => reservation.space)} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
