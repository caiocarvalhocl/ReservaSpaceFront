import type { SearchProps } from '../../interfaces/components';
import { toCapitalize } from '../../utils/toCapitalize';

export function Search({ filters, onFilterChange }: SearchProps) {
  return (
    <section>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col md:flex-row gap-4 bg-white w-full p-8 rounded-xl mx-auto'>
          {filters.map((filter, index) => (
            <div key={filter.name + index} className='flex flex-col w-full gap-1'>
              <label className='text-xl sm:text-2xl'>{filter.label}</label>
              {filter.type === 'text' && (
                <input
                  type='text'
                  placeholder={filter.placeholder}
                  className='outline outline-gray-200 p-2 text-xl sm:text-2xl'
                  onChange={e => onFilterChange(filter.name, e.target.value)}
                />
              )}
              {filter.type === 'select' && filter.options && (
                <select className='outline outline-gray-200 p-2 text-xl sm:text-2xl capitalize' onChange={e => onFilterChange(filter.name, e.target.value)}>
                  {filter.options.map((option, optIndex) => (
                    <option key={optIndex} value={option.value}>
                      {toCapitalize(option.label)}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
