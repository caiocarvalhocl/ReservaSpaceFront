import { useEffect, useState } from 'react';
import { getSpaces } from '../../service/api/useSpace';
import { SpaceCard } from '../SpaceCard';
import { type SpaceCardProps } from '../../interfaces/components';
import { spaceTypeMap } from '../../types/components';

export function Space() {
  const [spaces, setSpaces] = useState<SpaceCardProps[]>([]);
  const [filteredSpaces, setFilteredSpaces] = useState<SpaceCardProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [spaceType, setSpaceType] = useState('all');

  useEffect(() => {
    const fetchSpacesData = async () => {
      try {
        const data = await getSpaces();
        setSpaces(data);
        setFilteredSpaces(data);
        console.log('Fetched spaces:', data);
      } catch (err: any) {
        console.error('Error fetching spaces:', err);
      }
    };
    fetchSpacesData();
  }, []);

  useEffect(() => {
    let filtered = spaces;

    if (spaceType !== 'all') {
      filtered = filtered.filter(space => space.type === spaceType);
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(space =>
        space.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredSpaces(filtered);
  }, [spaceType, searchTerm, spaces]);

  const handleSpaceType = (type: string) => setSpaceType(type);

  return (
    <section>
      <div>
        <div className='p-4 flex flex-col gap-6'>
          <div className='flex flex-col md:flex-row gap-4 bg-white outline outline-gray-100 w-full p-8 rounded-xl mx-auto'>
            <div className='flex flex-col w-full gap-1'>
              <label className='text-xl sm:text-2xl'>Buscar espacos</label>
              <input
                type='text'
                placeholder='Digite o nome do espaços...'
                className='outline outline-gray-200 p-2 text-xl sm:text-2xl'
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-xl sm:text-2xl'>Tipo de espaço</label>
              <select
                className='outline outline-gray-200 p-2 text-xl sm:text-2xl'
                onChange={e => handleSpaceType(e.target.value)}
              >
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
              {filteredSpaces.map((space, index) => (
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
