import { ImageOff } from 'lucide-react';
import { Users } from 'lucide-react';
import { spaceTypeMap } from '../../types/components';
import { Reservation } from '../Reservation';
import { useState } from 'react';
import type { SpaceCardProps } from '../../interfaces/components';
import { TagList } from '../TagList';

export function SpaceCard({ imageUrl, name, description, type, price, capacity, spaceResources, isAvailable }: SpaceCardProps) {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const handleIsReservationModal = () => setIsReservationModalOpen(prev => !prev);

  return (
    <div className='w-full md:max-w-[31.5rem] lg:max-w-xl'>
      <div>
        <div className='relative flex justify-center items-center bg-gray-400 w-full min-h-60 p-4 rounded-t-lg'>
          <div>{imageUrl !== null ? <img src={imageUrl} alt='Picture' className='object-cover' /> : <ImageOff />}</div>

          <div className='absolute inset-4 w-fit h-fit'>
            {isAvailable ? (
              <span className='bg-black text-base sm:text-xl text-white font-semibold px-3 py-1 rounded-full self-start'>Disponível</span>
            ) : (
              <span className='bg-black text-white text-base sm:text-xl font-semibold px-3 py-1 rounded-full self-start'>Indisponível</span>
            )}
          </div>

          <div className='absolute inset-4 ml-auto w-fit h-fit'>
            <span className='bg-white text-base sm:text-xl text-black font-semibold px-2 py-1 rounded-full self-start'>{spaceTypeMap[type]}</span>
          </div>
        </div>

        <div className='flex flex-col gap-4 p-4 bg-white rounded-b-lg'>
          <div className='flex max-w-full items-center overflow-hidden'>
            <h3 className='font-semibold text-2xl sm:text-4xl'>{name}</h3>
            <p className='flex gap-2 text-blue-900 font-semibold text-xl sm:text-xl md:text-3xl ml-auto'>R${price}/h</p>
          </div>

          <div>
            <p className='text-xl sm:text-2xl truncate' aria-label={description}>
              {description}
            </p>
          </div>

          <div>
            <div className='flex gap-2'>
              <Users size={18} />
              <p className='text-xl sm:text-2xl'>Capacidade: {capacity} pessoas</p>
            </div>
          </div>

          <div className='flex items-center py-2'>
            <TagList items={spaceResources} type='resource' />
          </div>

          <div>
            <button
              className={`bg-black text-white w-full p-2 font-bold text-2xl rounded-md ${isAvailable ? 'cursor-pointer' : 'bg-gray-500'}`}
              disabled={!isAvailable}
              onClick={handleIsReservationModal}
            >
              {isAvailable ? <>Reservar Agora</> : <>Indisponível</>}
            </button>
          </div>
        </div>

        {isReservationModalOpen && <Reservation setIsOpen={handleIsReservationModal} name={name} />}
      </div>
    </div>
  );
}
