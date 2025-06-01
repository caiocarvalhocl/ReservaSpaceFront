import { ImageOff } from 'lucide-react';
import { Users } from 'lucide-react';
import type { SpaceCardProps } from '../../types/components';

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
    <section className='w-full'>
      <div className='outline outline-gray-300 rounded-md'>
        <div className='relative flex items-center justify-center bg-gray-400 p-16 rounded-top-md z-0'>
          {imageUrl !== null ? (
            <div>
              <img
                src={imageUrl}
                alt='Photo'
                className='outline object-cover'
              />
            </div>
          ) : (
            <ImageOff />
          )}

          <div className='absolute inset-4 w-fit h-fit'>
            {isAvailable ? (
              <span className='bg-black text-sm text-white font-semibold px-2 py-1 rounded-full self-start mb-2'>
                Disponível
              </span>
            ) : (
              <span className='bg-black text-white text-sm text-font-semibold px-2 py-1 rounded-full self-start mb-2'>
                Indisponível
              </span>
            )}
          </div>

          <div className='absolute inset-4 ml-auto w-fit h-fit'>
            <span className='bg-white text-sm text-black font-semibold px-2 py-1 rounded-full self-start mb-2'>
              {type}
            </span>
          </div>
        </div>

        <div className='bg-white p-4 flex flex-col gap-2 h-full'>
          <div className='flex items-center justify-between'>
            <h2 className='font-semibold text-xl'>{name}</h2>
            <p className='text-blue-900 font-semibold text-lg'>R$ {price}/h</p>
          </div>

          <p className='line-clamp-3'>{description}</p>

          <div className='flex flex-col gap-4 my-2'>
            <div className='flex items-center gap-2'>
              <Users size={18} />
              <p className='text-base'>Capacidade: {capacity} pessoas</p>
            </div>

            <ul className='flex gap-2'>
              {spaceResources.map((resource, index) => (
                <li
                  key={index}
                  className='rounded-full bg-gray-200 px-4 font-semibold'
                >
                  {resource.resource.name}
                </li>
              ))}
            </ul>
          </div>

          <button className='bg-black text-white w-full p-2 font-bold text-xl cursor-pointer'>
            Reservar Agora
          </button>
        </div>
      </div>
    </section>
  );
}
