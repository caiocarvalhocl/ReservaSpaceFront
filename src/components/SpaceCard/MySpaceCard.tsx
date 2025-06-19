import { CircleX, Edit, Ellipsis, Eye, ImageOff, Trash, Users } from 'lucide-react';
import type { SpaceCardProps } from '../../interfaces/components';
import { useState } from 'react';
import { SPACE_COLOR_STATUS_MAP, ICON_BASE_CLASSNAME } from '../../utils/constants';

export function MySpaceCard({ imageUrl, name, description, status, price, capacity, reservations }: SpaceCardProps) {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const formattedStatusText: Record<string, string> = {
    active: 'ativo',
    maintenance: 'manutencao',
    inactive: 'inativo',
  };

  const formattedLastReservation = reservations && reservations.length > 0 ? new Date(reservations[0].createdAt).toLocaleDateString() : undefined;

  return (
    <div className='w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] flex-shrink-0'>
      <div>
        <div className='relative flex justify-center items-center bg-gray-400 w-full min-h-60 p-4 rounded-t-lg'>
          <div>{imageUrl !== null ? <img src={imageUrl} alt='Picture' className='object-cover' /> : <ImageOff />}</div>

          <div className='absolute inset-4 w-fit h-fit'>
            <span className={`capitalize text-base sm:text-xl font-semibold px-3 py-1 rounded-full self-start ${SPACE_COLOR_STATUS_MAP[status || 'inactive']}`}>
              {formattedStatusText[status || 'inactive']}
            </span>
          </div>

          <div className='absolute inset-4 ml-auto w-fit h-fit'>
            <div className='relative flex items-center bg-white p-2 rounded-md'>
              <button className='text-gray-800 focus:outline-none cursor-pointer' onClick={() => setSubmenuOpen(prev => !prev)}>
                <Ellipsis className='w-8 h-8' />
              </button>
            </div>

            {submenuOpen && (
              <div className='absolute inset-13 -inset-x-40 z-50'>
                <div className='bg-white flex flex-col w-full max-w-3/5 rounded-md'>
                  <h3 className='text-lg font-bold p-4'>Ações</h3>

                  <div>
                    <ul>
                      <li className='p-4'>
                        <button className='flex gap-2 items-center cursor-pointer'>
                          <Eye className={`${ICON_BASE_CLASSNAME}`} />
                          <span className='text-lg sm:text-xl'>Ver Detalhes</span>
                        </button>
                      </li>
                      <li className='p-4'>
                        <button className='flex gap-2 items-center cursor-pointer'>
                          <Edit className={`${ICON_BASE_CLASSNAME}`} />
                          <span className='text-lg sm:text-xl'>Editar</span>
                        </button>
                      </li>
                      <li className='p-4'>
                        <button className='flex gap-2 items-center cursor-pointer'>
                          <CircleX className={`${ICON_BASE_CLASSNAME}`} />
                          <span className='text-lg sm:text-xl'>Desativar</span>
                        </button>
                      </li>

                      <hr className='text-gray-200' />

                      <li className='p-4'>
                        <button className='flex gap-2 items-center cursor-pointer text-red-500'>
                          <Trash className={`${ICON_BASE_CLASSNAME}`} />
                          <span className='text-lg sm:text-xl'>Excluir</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
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

          <div className='flex items-center py-2'>
            <div className='ml-auto'>
              {reservations && reservations.length > 0 ? (
                <p className='text-base text-gray-500'>Última reserva: {formattedLastReservation}</p>
              ) : (
                <p className='text-base text-gray-500'>Nunca reservado</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
