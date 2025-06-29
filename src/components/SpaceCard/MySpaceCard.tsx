import { CheckLine, Edit, Ellipsis, Eye, ImageOff, Trash, Users } from 'lucide-react';
import type { SpaceCardProps } from '../../interfaces/components';
import { useState } from 'react';
import { SPACE_COLOR_STATUS_MAP, ICON_BASE_CLASSNAME } from '../../utils/constants';
import { defaultImageByTypeMap, spaceStatusMap } from '../../types/components';
import { Button } from '../common/Button';
import { deleteSpace, updateReservationStatus } from '../../services/api';

export function MySpaceCard({ id, imageUrl, name, type, description, status, price, capacity, reservations }: SpaceCardProps) {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const findReservation = reservations && reservations.length > 0;
  const formattedDateLastReservation = findReservation ? new Date(reservations[0].createdAt).toLocaleDateString() : null;

  const handleReservationRelease = async (id: number) => {
    try {
      await updateReservationStatus({ id: Number(id), status: 'confirmed' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSpaceDelete = async (id: number) => {
    try {
      await deleteSpace({ id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] flex-shrink-0'>
      <div>
        <div className='relative flex justify-center items-center bg-gray-400 w-full rounded-t-lg'>
          <div className='w-full h-full flex'>
            {imageUrl || defaultImageByTypeMap[type] ? (
              <img src={imageUrl ? imageUrl : defaultImageByTypeMap[type]} alt='Picture' className='w-full h-full object-cover rounded-t-lg' />
            ) : (
              <ImageOff className='w-10 h-10 m-auto' />
            )}
          </div>

          <div className='absolute inset-4 w-fit h-fit'>
            <span className={`capitalize text-base sm:text-xl font-semibold px-3 py-1 rounded-full self-start ${SPACE_COLOR_STATUS_MAP[status || 'inactive']}`}>
              {spaceStatusMap[status || 'inactive']}
            </span>
          </div>

          <div className='absolute inset-4 ml-auto w-fit h-fit'>
            <div className='relative flex items-center bg-white p-2 rounded-md'>
              <Button colorType='paper' className='text-gray-800 h-9 focus:outline-none' onClick={() => setSubmenuOpen(prev => !prev)}>
                <Ellipsis className='w-8 h-8' />
              </Button>
            </div>

            {submenuOpen && (
              <div className='absolute inset-13 -inset-x-40 z-50'>
                <div className='bg-white flex flex-col w-full max-w-3/5 rounded-md'>
                  <h3 className='text-lg font-bold p-4'>Ações</h3>

                  <div>
                    <ul>
                      <li className='p-4'>
                        <Button colorType='paper' className='sm:text-lg text-start' value='Ver Detalhes'>
                          <Eye className={`${ICON_BASE_CLASSNAME}`} />
                        </Button>
                      </li>
                      <li className='p-4'>
                        <Button colorType='paper' className='text-lg sm:text-xl' value='Editar'>
                          <Edit className={`${ICON_BASE_CLASSNAME}`} />
                        </Button>
                      </li>

                      {findReservation && reservations[0].status === 'pending' && (
                        <li className='p-4'>
                          <Button colorType='paper' value='Liberar reserva' className='text-sm sm:text-lg' onClick={() => handleReservationRelease(reservations[0].id)}>
                            <CheckLine className={`${ICON_BASE_CLASSNAME}`} />
                          </Button>
                        </li>
                      )}

                      <hr className='text-gray-200' />

                      <li className='p-4'>
                        <Button colorType='red' className='text-lg sm:text-xl' value='Excluir' onClick={() => handleSpaceDelete(id)}>
                          <Trash className={`${ICON_BASE_CLASSNAME}`} />
                        </Button>
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
            <div className='flex gap-2 items-center text-xl sm:text-2xl'>
              <Users className={`${ICON_BASE_CLASSNAME}`} />
              <p>Capacidade: {capacity} pessoas</p>
            </div>
          </div>

          <div className='flex items-center py-2'>
            <div className='ml-auto'>
              {findReservation ? (
                <p className='text-base text-gray-500'>Última reserva: {formattedDateLastReservation}</p>
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
