import { useEffect, useState } from 'react';
import { Counter } from '../../components/Counter';
import { Layout } from '../../components/Layout';
import { getCounters } from '../../utils/getCounters';
import type { SpaceCardProps } from '../../interfaces/components';
import { getMySpaces } from '../../services/api';
import { MySpaceCard } from '../../components/SpaceCard/MySpaceCard';
import { SpaceForm } from '../../components/Form/SpaceForm';
import { Button } from '../../components/common/Button';

export function MySpaces() {
  const [spaces, setSpaces] = useState<SpaceCardProps[]>([]);
  const [isSpaceFormOpen, setIsSpaceFormOpen] = useState(false);

  useEffect(() => {
    const fetchMySpacesData = async () => {
      try {
        const data = await getMySpaces();
        setSpaces(data);
      } catch (err: any) {
        console.error('Error fetching spaces:', err);
      }
    };
    fetchMySpacesData();
  }, []);

  const counters = getCounters({ counterType: 'spaces', counter: spaces });
  const handleSpaceFormModal = () => setIsSpaceFormOpen(prev => !prev);

  return (
    <Layout>
      <div className='w-full xl:max-w-9/12 mx-auto'>
        <div className='p-6'>
          <div className='flex items-center flex-wrap'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-5xl lg:text-7xl font-bold'>Meus Espaços</h1>
              <p className='text-2xl lg:text-3xl text-gray-600'>Gerencie todos os seus espaços</p>
            </div>

            <Button
              colorType='main'
              hoverType='secondary'
              className='p-4 my-2 text-base sm:text-lg lg:text-xl font-semibold ml-auto'
              value='Adicionar Espaços'
              onClick={handleSpaceFormModal}
            />
          </div>

          <div className='flex flex-col md:flex-row gap-8 md:gap-4 my-8'>
            {counters.map((counter, index) => (
              <Counter key={index} title={counter.title} count={counter.count} icon={counter.icon} color={counter.color} />
            ))}
          </div>

          <div>
            <div className='flex flex-wrap justify-center gap-4 mb-4'>
              {spaces.length > 0 ? (
                spaces.map((space, index) => (
                  <MySpaceCard
                    key={index}
                    id={space.id}
                    type={space.type}
                    imageUrl={space.imageUrl}
                    name={space.name}
                    price={space.price}
                    description={space.description}
                    capacity={space.capacity}
                    status={space.status}
                    reservations={space.reservations}
                  />
                ))
              ) : (
                <div className='m-auto'>
                  <p>Você não tem espaços</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isSpaceFormOpen && <SpaceForm setIsOpen={handleSpaceFormModal} />}
    </Layout>
  );
}
