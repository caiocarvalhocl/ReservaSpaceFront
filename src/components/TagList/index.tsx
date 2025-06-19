import type { ResourcesProps, TagListProps } from '../../interfaces/components';
import { reservationStatusMap, type ReservationStatus } from '../../types/components';

export function TagList({ items, type = 'status', maxVisible = 2 }: TagListProps) {
  const handleItemType = (item: any) => {
    if (type === 'resource') {
      const resourceItem = item as ResourcesProps;
      return resourceItem.resource.name;
    }

    return reservationStatusMap[item as ReservationStatus] as string;
  };

  return (
    <>
      <div>
        {items && items.length > 0 && (
          <div className='mt-auto pt-2'>
            <ul className='flex flex-wrap gap-1 overflow-hidden'>
              {items.slice(0, maxVisible).map((item, index) => (
                <li
                  key={index}
                  className={`rounded-full ${type === 'status' ? 'bg-blue-200 text-blue-900' : 'bg-gray-200 text-black'} px-3 py-1 text-base capitalize sm:text-lg text-center flex items-center font-semibold max-w-[120px] sm:max-w-[150px] truncate`}
                >
                  {handleItemType(item)}
                </li>
              ))}
              {items.length > 3 && (
                <li className='rounded-full bg-gray-200 text-gray-800 px-3 py-1 text-sm sm:text-base text-center flex items-center font-semibold'>+{items.length - 3} More</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
