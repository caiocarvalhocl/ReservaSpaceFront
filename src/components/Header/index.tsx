import { CalendarDays } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';

export function Header() {
  const { state } = useAuth();
  const navigate = useNavigate();

  return (
    <div className='bg-white overflow-hidden'>
      <nav className='flex items-center justify-between p-4 border-b border-b-amber-50'>
        <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/')}>
          <CalendarDays color='blue' size='1.6rem' />
          <h1 className='text-2xl md:text-3xl font-bold'>ReservaSpace</h1>
        </div>
        <ul className='flex gap-2 sm:gap-4 items-center text-base sm:text-xl'>
          {state.isLoggedIn && (
            <>
              <li className='flex items-center'>
                <a className='cursor-pointer' onClick={() => navigate('/myreservations')}>
                  Minhas Reservas
                </a>
              </li>

              <li className='bg-black p-2 rounded-md flex items-center cursor-pointer'>
                <a className='cursor-pointer font-bold text-white'>{state.user.name}</a>
              </li>
            </>
          )}

          {!state.isLoggedIn && (
            <li className='bg-black p-2 rounded-md flex items-center cursor-pointer'>
              <a className='cursor-pointer font-bold text-white' onClick={() => navigate('/login')}>
                Entrar
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
