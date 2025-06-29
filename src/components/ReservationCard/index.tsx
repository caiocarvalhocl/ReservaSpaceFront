import { CalendarIcon, Eye, ImageOff, Trash2 } from 'lucide-react';
import { Users } from 'lucide-react';
import { defaultImageByTypeMap, spaceTypeMap } from '../../types/components';
import type { ReseravationCardProps } from '../../interfaces/components';
import { TagList } from '../TagList';
import { Button } from '../common/Button';
import { ICON_BASE_CLASSNAME } from '../../utils/constants';
import { updateReservationStatus } from '../../services/api';

export function ReservationCard({ id, imageUrl, name, description, type, price, capacity, spaceResources, status, startTime, endTime }: ReseravationCardProps) {
  const formattedDate = status === 'canceled' && endTime ? new Date(endTime).toLocaleDateString() : new Date(startTime).toLocaleDateString();

  const handleReservationCancel = async (id: number) => {
    try {
      const response = await updateReservationStatus({ id: Number(id), status: 'canceled' });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-full md:min-w-full flex flex-col justify-between'>
      <div className='flex flex-col md:flex-row'>
        <div className='relative flex justify-center items-center bg-gray-400 w-full h-[200px] rounded-t-lg overflow-hidden'>
          <div className='w-full h-full flex'>
            {imageUrl || defaultImageByTypeMap[type] ? (
              <img src={imageUrl ? imageUrl : defaultImageByTypeMap[type]} alt='Picture' className='w-full h-full object-cover rounded-t-lg' />
            ) : (
              <ImageOff className='w-10 h-10 m-auto' />
            )}
          </div>
          <div className='absolute inset-4 w-fit h-fit'></div>

          <div className='absolute inset-4 ml-auto w-fit h-fit'>
            <span className='bg-white text-base sm:text-xl text-black font-semibold px-2 py-1 rounded-full self-start'>{spaceTypeMap[type]}</span>
          </div>

          <div className='absolute inset-4 w-fit h-fit'>
            <TagList type='status' items={[status]} />
          </div>
        </div>

        <div className='w-full flex flex-col gap-4 p-4 bg-white rounded-b-lg'>
          <div className='flex max-w-full items-center overflow-hidden'>
            <div className='flex flex-col gap-1'>
              <h3 className='font-semibold text-2xl sm:text-3xl'>{name}</h3>
              <div>
                <p className='text-gray-400 text-lg'>Codigo: PW2{id}</p>
              </div>
            </div>
            <p className='flex gap-2 text-blue-900 font-semibold text-xl sm:text-xl md:text-2xl ml-auto'>R${price}</p>
          </div>

          <div>
            <p className='text-xl'>{description}</p>
          </div>

          <div>
            <div className='flex gap-4'>
              <div className='flex gap-2 items-center'>
                <CalendarIcon className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />
                <p className='text-xl'>{formattedDate}</p>
              </div>
              <div className='flex gap-2 items-center'>
                <Users className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />
                <p className='text-xl'>Capacidade: {capacity} pessoas</p>
              </div>
            </div>
          </div>

          <div className='flex items-center py-2'>
            <TagList type='resource' items={spaceResources} />
          </div>

          <div>
            <div className='flex flex-wrap gap-2'>
              <Button colorType='paper' value='Detalhes' className='outline outline-gray-300 font-semibold' hoverType='paper'>
                <Eye className={`${ICON_BASE_CLASSNAME}`} />
              </Button>

              {status === 'confirmed' && (
                <Button colorType='red' value='Cancelar' className='outline outline-gray-300 font-semibold' hoverType='red' onClick={() => handleReservationCancel(id)}>
                  <Trash2 className={`${ICON_BASE_CLASSNAME}`} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
