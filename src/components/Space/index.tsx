import { useEffect, useState } from 'react';
import { getSpaces } from '../../service/api';
import { SpaceCard } from '../SpaceCard';
import { type SpaceCardProps } from '../../interfaces/components';
import { Search } from '../Search';

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
      filtered = filtered.filter(space => space.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredSpaces(filtered);
  }, [spaceType, searchTerm, spaces]);

  const handleSpaceType = (type: string) => setSpaceType(type);

  return (
    <section>
      <div>
        <div className='p-4 flex flex-col gap-6'>
          <div>
            <Search onChangeSearchTerm={setSearchTerm} onChangeSpaceType={handleSpaceType} spaces={spaces} />
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
