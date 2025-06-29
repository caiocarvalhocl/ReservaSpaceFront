import { ImageOff } from 'lucide-react';
import { Users } from 'lucide-react';
import { defaultImageByTypeMap, spaceTypeMap } from '../../types/components';
import { useState } from 'react';
import type { ResourcesProps, SpaceCardProps } from '../../interfaces/components';
import { TagList } from '../TagList';
import { Book } from '../Book';
import { Button } from '../common/Button';

export function SpaceCard({ id, imageUrl, name, description, type, price, capacity, spaceResources, isAvailable }: SpaceCardProps) {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const handleIsBookModal = () => setIsBookModalOpen(prev => !prev);

  return (
    <div className='w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] flex-shrink-0'>
      <div>
        <div className='relative flex justify-center items-center bg-gray-400 w-full h-[200px] rounded-t-lg overflow-hidden'>
          <div className='w-full h-full flex'>
            {imageUrl || defaultImageByTypeMap[type] ? (
              <img src={imageUrl ? imageUrl : defaultImageByTypeMap[type]} alt='Picture' className='w-full h-full object-cover rounded-t-lg' />
            ) : (
              <ImageOff className='w-10 h-10 m-auto' />
            )}
          </div>

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
              <Users className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />
              <p className='text-xl sm:text-2xl'>Capacidade: {capacity} pessoas</p>
            </div>
          </div>

          <div className='flex items-center py-2 h-[25px]'>
            <TagList items={spaceResources as ResourcesProps[]} type='resource' />
          </div>

          <div>
            <Button
              className={`w-full font-bold text-2xl`}
              colorType={isAvailable ? 'main' : 'secondary'}
              disabled={!isAvailable}
              onClick={handleIsBookModal}
              value={isAvailable ? 'Reservar Agora' : 'Indisponível'}
            />
          </div>
        </div>

        {isBookModalOpen && <Book spaceId={id} setIsOpen={handleIsBookModal} name={name} />}
      </div>
    </div>
  );
}
