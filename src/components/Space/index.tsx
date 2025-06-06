import { useEffect, useState } from 'react';
import { getSpaces } from '../../service/api';
import { SpaceCard } from '../SpaceCard';
import { spaceTypeMap, type SpaceCardProps } from '../../types/components';

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
      }
    };
    fetchSpacesData();
  }, []);

  return (
    <section className=''>
      <div>
        <div className='p-4 flex flex-col gap-6'>
          <div className='flex flex-col md:flex-row gap-4 bg-white outline outline-gray-100 w-full p-8 rounded-xl mx-auto'>
            <div className='flex flex-col w-full gap-1'>
              <label className='text-xl sm:text-2xl'>Buscar espacos</label>
              <input
                type='text'
                placeholder='Digite o nome do espaços...'
                className='outline outline-gray-200 p-2 text-xl sm:text-2xl'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-xl sm:text-2xl'>Tipo de espaço</label>
              <select className='outline outline-gray-200 p-2 text-xl sm:text-2xl'>
                <option value='all'>Todos os tipos</option>
                {Array.from(new Set(spaces.map(space => space.type))).map(
                  (type, index) => (
                    <option key={index} value={type}>
                      {spaceTypeMap[type]}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          <div>
            <div className='flex flex-col sm:flex-row flex-wrap gap-4'>
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
          </div>
        </div>
      </div>
    </section>
  );
}
