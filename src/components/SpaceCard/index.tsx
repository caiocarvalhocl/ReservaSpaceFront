import { ImageOff } from 'lucide-react';
import { Users } from 'lucide-react';
import { spaceTypeMap, type SpaceCardProps } from '../../types/components';
import { ResourceInfoLayout } from '../ResourceInfoLayout';

export function SpaceCard({
  imageUrl,
  name,
  description,
  type,
  price,
  capacity,
  spaceResources,
  isAvailable,
}: SpaceCardProps) {
  return (
    <div className='w-full sm:max-w-xl lg:max-w-2xl mx-auto'>
      <div className=''>
        <div className='relative flex justify-center items-center bg-gray-400 w-full min-h-60 p-4'>
          <div>
            {imageUrl !== null ? (
              <img src={imageUrl} alt='Picture' className='object-cover' />
            ) : (
              <ImageOff />
            )}
          </div>

          <div className='absolute inset-4 w-fit h-fit'>
            {isAvailable ? (
              <span className='bg-black text-xl sm:text-2xl text-white font-semibold px-2 py-1 rounded-full self-start'>
                Disponível
              </span>
            ) : (
              <span className='bg-black text-white text-xl sm:text-2xl text-sm font-semibold px-2 py-1 rounded-full self-start'>
                Indisponível
              </span>
            )}
          </div>

          <div className='absolute inset-4 ml-auto w-fit h-fit'>
            <span className='bg-white text-xl sm:text-2xl text-black font-semibold px-2 py-1 rounded-full self-start'>
              {spaceTypeMap[type]}
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-4 p-4 bg-white'>
          <div className='flex max-w-full overflow-hidden'>
            <h3 className='font-semibold text-2xl sm:text-4xl'>{name}</h3>
            <p className='flex gap-2 text-blue-900 font-semibold text-xl sm:text-xl md:text-3xl ml-auto'>
              R${price}/h
            </p>
          </div>

          <div>
            <p className='text-xl sm:text-2xl'>{description}</p>
          </div>

          <div>
            <div className='flex gap-2'>
              <Users size={18} />
              <p className='text-xl sm:text-2xl'>
                Capacidade: {capacity} pessoas
              </p>
            </div>
          </div>

          <div className='flex items-center py-2 '>
            <ResourceInfoLayout resources={spaceResources} />
          </div>

          <div>
            <button className='bg-black text-white w-full p-2 font-bold text-2xl rounded-md cursor-pointer'>
              Reservar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
