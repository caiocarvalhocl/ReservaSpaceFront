import type { SearchProps } from '../../interfaces/components';
import { spaceTypeMap } from '../../types/components';

export function Search({
  spaces,
  onChangeSpaceType,
  onChangeSearchTerm,
}: SearchProps) {
  return (
    <section>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col md:flex-row gap-4 bg-white outline outline-gray-100 w-full p-8 rounded-xl mx-auto'>
          <div className='flex flex-col w-full gap-1'>
            <label className='text-xl sm:text-2xl'>Buscar espacos</label>
            <input
              type='text'
              placeholder='Digite o nome do espaços...'
              className='outline outline-gray-200 p-2 text-xl sm:text-2xl'
              onChange={e => onChangeSearchTerm(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='text-xl sm:text-2xl'>Tipo de espaço</label>
            <select
              className='outline outline-gray-200 p-2 text-xl sm:text-2xl'
              onChange={e => onChangeSpaceType(e.target.value)}
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
      </div>
    </section>
  );
}
