import { Counter } from '../../components/Counter';
import { Layout } from '../../components/Layout';
import { Search } from '../../components/Search';
import { useEffect, useState } from 'react';
import type { FilterField, ResourcesProps, UserReservationsProps } from '../../interfaces/components';
import { getMyReservations } from '../../services/api';
import { ReservationCard } from '../../components/ReservationCard';
import { getCounters } from '../../utils/getCounters';
import { reservationStatusMap } from '../../types/components';

export function MyReservation() {
  const [reservations, setReservations] = useState<UserReservationsProps[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<UserReservationsProps[]>([]);
  const [currentFilters, setCurrentFilters] = useState<Record<string, string>>({
    searchTerm: '',
    status: 'all',
  });
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

    if (currentFilters.status !== 'all') {
      filtered = filtered.filter(reservation => reservation.status === currentFilters.status);
    }

    if (currentFilters.searchTerm.trim() !== '') {
      filtered = filtered.filter(reservation => reservation.space.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase()));
    }

    setFilteredReservations(filtered);
  }, [currentFilters, reservations]);

  const handleFilterChange = (fieldName: string, value: string) => {
    setCurrentFilters(prevFilters => ({
      ...prevFilters,
      [fieldName]: value,
    }));
  };

  const reservationFilterFields: FilterField[] = [
    {
      name: 'searchTerm',
      label: 'Buscar reservas',
      type: 'text',
      placeholder: 'Digite o nome do espaços...',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [{ value: 'all', label: 'Todos' }, ...Object.entries(reservationStatusMap).map(([value, label]) => ({ value, label: label as string }))],
    },
  ];

  const counters = getCounters({ counterType: 'reservations', counter: filteredReservations });

  return (
    <Layout>
      <div className='w-full xl:max-w-9/12 mx-auto'>
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
            <Search filters={reservationFilterFields} onFilterChange={handleFilterChange} />
          </div>

          <div>
            <div className='flex flex-col sm:flex-row flex-wrap gap-4'>
              {filteredReservations.length > 0 ? (
                filteredReservations.map((reservation, index) => (
                  <ReservationCard
                    key={index}
                    id={reservation.id}
                    type={reservation.space.type}
                    imageUrl={reservation.space.imageUrl}
                    name={reservation.space.name}
                    price={reservation.space.price}
                    description={reservation.space.description}
                    capacity={reservation.space.capacity}
                    spaceResources={reservation.space.spaceResources as ResourcesProps[]}
                    status={reservation.status}
                    startTime={reservation.startTime}
                    endTime={reservation.endTime}
                  />
                ))
              ) : (
                <div className='m-auto'>
                  <p>Voce nao tem reservas</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
