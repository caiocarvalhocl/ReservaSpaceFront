import { useEffect, useState } from 'react';
import { getSpaces } from '../../services/api';
import { SpaceCard } from '../SpaceCard';
import { type FilterField, type SpaceCardProps } from '../../interfaces/components';
import { Search } from '../Search';
import { spaceTypeMap } from '../../types/components';

export function Space() {
  const [spaces, setSpaces] = useState<SpaceCardProps[]>([]);
  const [filteredSpaces, setFilteredSpaces] = useState<SpaceCardProps[]>([]);
  const [currentFilters, setCurrentFilters] = useState<Record<string, string>>({
    searchTerm: '',
    spaceType: 'all',
  });

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

    if (currentFilters.spaceType !== 'all') {
      filtered = filtered.filter(space => space.type === currentFilters.spaceType);
    }

    if (currentFilters.searchTerm.trim() !== '') {
      filtered = filtered.filter(space => space.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase()));
    }

    setFilteredSpaces(filtered);
  }, [currentFilters, spaces]);

  const handleFilterChange = (fieldName: string, value: string) => {
    setCurrentFilters(prevFilters => ({
      ...prevFilters,
      [fieldName]: value,
    }));
  };

  const spaceFilterFields: FilterField[] = [
    {
      name: 'searchTerm',
      label: 'Buscar espaços',
      type: 'text',
      placeholder: 'Digite o nome do espaços...',
    },
    {
      name: 'spaceType',
      label: 'Tipo de espaço',
      type: 'select',
      options: [{ value: 'all', label: 'Todos' }, ...Object.entries(spaceTypeMap).map(([value, label]) => ({ value, label: label as string }))],
    },
  ];

  return (
    <section className='p-4 sm:p-0'>
      <div className='w-full flex flex-col gap-8'>
        <Search filters={spaceFilterFields} onFilterChange={handleFilterChange} />

        <div className='flex flex-wrap justify-center gap-4 mb-4'>
          {filteredSpaces.map((space, index) => (
            <SpaceCard
              key={index}
              id={space.id}
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
    </section>
  );
}
