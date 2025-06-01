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
        <div className='relative flex items-center justify-center bg-gray-400 p-16 rounded-top-md'>
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
              {type}
            </span>
          </div>
        </div>

        <div className='bg-white p-4 flex flex-col gap-2 h-full'>
          <div className='flex items-center justify-between'>
            <h2 className='font-semibold text-xl sm:text-4xl'>{name}</h2>
            <p className='text-blue-900 font-semibold text-xl sm:text-4xl'>
              R$ {price}/h
            </p>
          </div>

          <p className='text-lg sm:text-xl'>{description}</p>

          <div className='flex flex-col gap-4 my-2'>
            <div className='flex items-center gap-2'>
              <Users size={18} />
              <p className='text-xl md:text-2xl'>
                Capacidade: {capacity} pessoas
              </p>
            </div>

            <ul className='flex gap-2'>
              {spaceResources.map((item, index) => (
                <li
                  key={index}
                  className='rounded-full bg-gray-200 px-4 text-xl sm:text-xl font-semibold'
                >
                  {item.resource.name}
                </li>
              ))}
            </ul>
          </div>

          <button className='bg-black text-white w-full p-2 font-bold text-2xl sm:text-3xl cursor-pointer'>
            Reservar Agora
          </button>
        </div>
      </div>
    </section>
  );
}
