import { useEffect, useState } from 'react';
import { Counter } from '../../components/Counter';
import { Layout } from '../../components/Layout';
import { getCounters } from '../../utils/getCounters';
import type { FilterField, SpaceCardProps } from '../../interfaces/components';
import { getMySpaces } from '../../services/api';
import { MySpaceCard } from '../../components/SpaceCard/MySpaceCard';
import { SpaceForm } from '../../components/Form/SpaceForm';
import { Button } from '../../components/common/Button';
import { Search } from '../../components/Search';
import { updateFormData } from '../../utils/updateFormData';
import { spaceStatusMap, spaceTypeMap } from '../../types/components';

export function MySpaces() {
  const [spaces, setSpaces] = useState<SpaceCardProps[]>([]);
  const [isSpaceFormOpen, setIsSpaceFormOpen] = useState(false);
  const [filteredSpaces, setFilteredSpaces] = useState<SpaceCardProps[]>([]);
  const [currentFilters, setCurrentFilters] = useState<Record<string, string>>({
    searchTerm: '',
    spaceType: 'all',
    status: 'all',
  });

  useEffect(() => {
    const fetchMySpacesData = async () => {
      try {
        const data = await getMySpaces();
        setSpaces(data);
        setFilteredSpaces(filteredSpaces);
      } catch (err: any) {
        console.error('Error fetching spaces:', err);
      }
    };
    fetchMySpacesData();
  }, []);

  useEffect(() => {
    let filtered = spaces;

    if (currentFilters.spaceType !== 'all') {
      filtered = filtered.filter(space => space.type === currentFilters.spaceType);
    }

    if (currentFilters.status !== 'all') {
      filtered = filtered.filter(space => space.status === currentFilters.status);
    }
    if (currentFilters.searchTerm.trim() !== '') {
      filtered = filtered.filter(space => space.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase()));
    }

    setFilteredSpaces(filtered);
  }, [currentFilters, spaces]);

  const handleFilterChange = (fieldName: string, value: string) => updateFormData({ key: fieldName, value, setState: setCurrentFilters });

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
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [{ value: 'all', label: 'Todos' }, ...Object.entries(spaceStatusMap).map(([value, label]) => ({ value, label: label as string }))],
    },
  ];

  const counters = getCounters({ counterType: 'spaces', counter: filteredSpaces });
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

          <div className='mb-8'>
            <Search filters={spaceFilterFields} onFilterChange={handleFilterChange} />
          </div>

          <div>
            <div className='flex flex-wrap justify-center gap-4 mb-4'>
              {filteredSpaces.length > 0 ? (
                filteredSpaces.map((space, index) => (
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
