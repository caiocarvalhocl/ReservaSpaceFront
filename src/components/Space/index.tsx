import { useEffect, useState } from 'react';
import { getSpaces } from '../../service/api';
import { SpaceCard } from '../SpaceCard';
import type { SpaceCardProps } from '../../types/components';

export function Space() {
  const [spaces, setSpaces] = useState<SpaceCardProps[]>([]);

  useEffect(() => {
    const fetchSpacesData = async () => {
      try {
        const data = await getSpaces();
        setSpaces(data);
        console.log('Fetched spaces:', data);
      } catch (err: any) {
        console.error('Error fetching spaces:', err);
      } finally {
      }
    };
    fetchSpacesData();
  }, []);

  return (
    <section className='w-full my-8 flex flex-col gap-8 p-6 '>
      <div className='flex flex-col md:flex-row gap-4 bg-white outline outline-gray-100 w-full p-8 rounded-xl mx-auto'>
        <div className='flex flex-col w-full'>
          <label>Buscar espacos</label>
          <input
            type='text'
            placeholder='Digite o nome do espaços...'
            className='outline outline-gray-200 p-2'
          />
        </div>

        <div className='flex flex-col'>
          <label>Tipo de espaço</label>
          <select className='outline outline-gray-200 p-2'>
            <option value='all' defaultValue={''} selected>
              Todos os tipos
            </option>
            {spaces.map((space, index) => (
              <option key={index} value={space.type}>
                {space.type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className=' w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch'>
        {spaces.map((space, index) => (
          <SpaceCard
            key={index}
            type={space.type}
            imageUrl={space.imageUrl}
            name={space.name}
            price={space.price}
            description={space.description}
            capacity={space.capacity}
            spaceResources={space.spaceResources}
            isAvailable={space.isAvailable}
          />
        ))}
      </div>
    </section>
  );
}
