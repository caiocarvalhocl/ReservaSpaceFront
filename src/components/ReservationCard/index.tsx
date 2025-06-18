import { CalendarIcon, Eye, ImageOff, Trash2 } from 'lucide-react';
import { Users } from 'lucide-react';
import { spaceTypeMap } from '../../types/components';
import type { ReseravationCardProps } from '../../interfaces/components';
import { TagList } from '../TagList';

export function ReservationCard({ id, imageUrl, name, description, type, price, capacity, spaceResources, status, startTime, endTime }: ReseravationCardProps) {
  const formattedDate = status === 'cancelada' && endTime ? new Date(endTime).toLocaleDateString() : new Date(startTime).toLocaleDateString();

  return (
    <div className='w-full md:min-w-full flex flex-col justify-between'>
      <div className='flex flex-col md:flex-row'>
        <div className='relative flex justify-center items-center bg-gray-400 w-full min-h-60 p-4 rounded-t-lg md:rounded-tr-none md:rounded-bl-lg md:max-w-1/2 lg:max-w-1/3'>
          <div>{imageUrl !== null ? <img src={imageUrl} alt='Picture' className='object-cover' /> : <ImageOff />}</div>

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
              <button className='flex items-center gap-2 outline w-fit p-2 outline-gray-300 rounded-md cursor-pointer hover:bg-black hover:text-white'>
                <Eye className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />
                <span className='font-semibold text-lg sm:text-2xl'>Detalhes</span>
              </button>

              {status === 'confirmada' && (
                <button className='flex items-center gap-2 outline w-fit p-2 outline-gray-300 rounded-md cursor-pointer text-red-500 hover:bg-red-500 hover:text-white hover:outline-red-500'>
                  <Trash2 className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />
                  <span className='font-semibold text-xl sm:text-2xl'>Cancelar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
