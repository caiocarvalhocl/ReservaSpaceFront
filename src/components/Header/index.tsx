import { CalendarDays } from 'lucide-react';

export function Header() {
  return (
    <div className='overflow-hidden'>
      <nav className='flex items-center justify-between p-4 border-b border-b-amber-50'>
        <div className='flex items-center gap-2'>
          <CalendarDays color='blue' size='1.6rem' />
          <h1 className='text-2xl md:text-3xl font-bold'>ReservaSpace</h1>
        </div>
        <ul className='flex gap-2 sm:gap-4 items-center text-base sm:text-xl'>
          <li className='flex items-center'>
            <a className='cursor-pointer'>Minhas Reservas</a>
          </li>
          <li className='flex items-center'>
            <a className='cursor-pointer'>Perfil</a>
          </li>
          <li className='bg-black p-2 rounded-md flex items-center cursor-pointer'>
            <a className='text-white'>Entrar</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
