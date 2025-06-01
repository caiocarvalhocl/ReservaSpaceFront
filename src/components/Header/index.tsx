import { CalendarDays } from 'lucide-react';

export function Header() {
  return (
    <div className='overflow-hidden'>
      <nav className='flex items-center justify-between p-4 border-b border-b-amber-50'>
        <div className='flex items-center gap-2'>
          <CalendarDays color='blue' />
          <h1 className='text-lg font-bold'>ReservaSpace</h1>
        </div>
        <ul className='flex gap-4 items-center'>
          <li className='flex items-center'>
            <a className='text-sm md:text-base'>Minhas Reservas</a>
          </li>
          <li className='flex items-center'>
            <a className='text-sm md:text-base'>Perfil</a>
          </li>
          <li className='bg-black p-2 rounded-md flex items-center cursor-pointer'>
            <a className='text-white text-sm md:text-base '>Entrar</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
