import type { ResourceInfoLayoutProps } from '../../types/components';

export function ResourceInfoLayout({ resources }: ResourceInfoLayoutProps) {
  return (
    <>
      <div>
        {resources && resources.length > 0 && (
          <div className='mt-auto pt-2'>
            <ul className='flex flex-wrap gap-1 overflow-hidden'>
              {resources.slice(0, 2).map((item, index) => (
                <li
                  key={index}
                  className='rounded-full bg-gray-200 text-black px-3 py-1 text-sm sm:text-xl text-center flex items-center font-semibold max-w-[120px] sm:max-w-[150px] truncate'
                >
                  {item.resource.name}
                </li>
              ))}
              {resources.length > 3 && (
                <li className='rounded-full bg-gray-200 text-gray-800 px-3 py-1 text-sm sm:text-base text-center flex items-center font-semibold'>
                  +{resources.length - 3} More
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
