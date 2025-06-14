import { Counter } from '../../components/Counter';
import { Layout } from '../../components/Layout';
import { Search } from '../../components/Search';
import { useEffect, useState } from 'react';
import type { UserReservationsProps } from '../../interfaces/components';
import { getMyReservations } from '../../services/api';
import { ReservationCard } from '../../components/ReservationCard';
import { getCounters } from '../../utils/getCounters';

export function MyReservation() {
  const [reservations, setReservations] = useState<UserReservationsProps[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<UserReservationsProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [spaceType, setSpaceType] = useState('all');

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getMyReservations();
      setReservations(data);
      setFilteredReservations(data);
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    let filtered = reservations;

    if (spaceType !== 'all') {
      filtered = filtered.filter(res => res.space.type === spaceType);
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(res => res.space.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredReservations(filtered);
  }, [spaceType, searchTerm, reservations]);

  const handleSpaceType = (type: string) => setSpaceType(type);

  const counters = getCounters({ filteredReservations });

  return (
    <Layout>
      <div className='min-h-screen mx-auto'>
        <div className='p-6'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-5xl lg:text-7xl font-bold'>Minhas Reservas</h1>
            <p className='text-2xl lg:text-3xl text-gray-600'>Gerencie todas as suas reservas de espaços</p>
          </div>
          <div className='flex flex-col md:flex-row gap-8 md:gap-4 my-8'>
            {counters.map((counter, index) => (
              <Counter key={index} title={counter.title} count={counter.count} icon={counter.icon} color={counter.color} />
            ))}
          </div>

          <div className='my-6'>
            <Search onChangeSearchTerm={setSearchTerm} onChangeSpaceType={handleSpaceType} spaces={reservations.map(reservation => reservation.space)} />
          </div>

          <div>
            <div className='flex flex-col sm:flex-row flex-wrap gap-4'>
              {filteredReservations.map((reservation, index) => (
                <ReservationCard
                  key={index}
                  id={reservation.id}
                  type={reservation.space.type}
                  imageUrl={reservation.space.imageUrl}
                  name={reservation.space.name}
                  price={reservation.space.price}
                  description={reservation.space.description}
                  capacity={reservation.space.capacity}
                  spaceResources={reservation.space.spaceResources}
                  status={reservation.status}
                  startTime={reservation.startTime}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
