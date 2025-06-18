import { useState } from 'react';
import { CalendarDays, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { rolesMap } from '../../types/components';
import { getHighRoles } from '../../utils/getHighRoles';

export function Header() {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userRole = state.user ? state.user.role : 'regular';
  const authHighRoles = getHighRoles();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setShowLogout(false);
  };

  const handleLogoutClick = () => {
    logout();
    setIsMobileMenuOpen(false);
    setShowLogout(false);
  };

  return (
    <header className='bg-white'>
      <nav className='flex items-center justify-between p-4 border-b border-b-amber-50 sm:w-10/12 sm:mx-auto relative'>
        <div className='flex items-center gap-2 cursor-pointer' onClick={() => handleNavigation('/')}>
          <CalendarDays color='blue' className='w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8' />
          <h1 className='text-xl md:text-3xl font-bold'>ReservaSpace</h1>
        </div>

        <div className='sm:hidden flex items-center'>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className='text-gray-800 focus:outline-none'>
            {isMobileMenuOpen ? <X className='w-8 h-8' /> : <Menu className='w-8 h-8' />}
          </button>
        </div>

        <ul className='hidden sm:flex relative gap-2 sm:gap-4 items-center text-base sm:text-xl'>
          {state.isLoggedIn && (
            <>
              {authHighRoles.includes(rolesMap[userRole]) && (
                <li className='flex items-center truncate'>
                  <a className='cursor-pointer' onClick={() => handleNavigation('/myspaces')}>
                    Meus Espaços
                  </a>
                </li>
              )}

              <li className='flex items-center truncate'>
                <a className='cursor-pointer' onClick={() => handleNavigation('/myreservations')}>
                  Minhas Reservas
                </a>
              </li>

              <li className='bg-black p-2 rounded-md flex items-center cursor-pointer truncate' onMouseEnter={() => setShowLogout(true)} onMouseLeave={() => setShowLogout(false)}>
                <a className='cursor-pointer font-bold text-white'>{state.user ? state.user.name : 'Usuário'}</a>

                {showLogout && (
                  <div className='absolute top-full mt-2 right-0 bg-white text-black shadow-lg rounded-md p-4 text-xl z-10'>
                    <span className='cursor-pointer' onClick={handleLogoutClick}>
                      Sair
                    </span>
                  </div>
                )}
              </li>
            </>
          )}

          {!state.isLoggedIn && (
            <li className='bg-black p-2 rounded-md flex items-center cursor-pointer'>
              <a className='cursor-pointer font-bold text-white' onClick={() => handleNavigation('/login')}>
                Entrar
              </a>
            </li>
          )}
        </ul>

        {isMobileMenuOpen && (
          <div className='sm:hidden absolute top-full left-0 w-full bg-white shadow-lg rounded-b-md py-4 z-50'>
            <ul className='flex flex-col items-center gap-4 text-lg'>
              {state.isLoggedIn && (
                <>
                  {authHighRoles.includes(rolesMap[userRole]) && (
                    <li className='w-full text-center'>
                      <a className='block py-2 px-4 cursor-pointer hover:bg-gray-100' onClick={() => handleNavigation('/spaces')}>
                        Meus Espaços
                      </a>
                    </li>
                  )}

                  <li className='w-full text-center'>
                    <a className='block py-2 px-4 cursor-pointer hover:bg-gray-100' onClick={() => handleNavigation('/myreservations')}>
                      Minhas Reservas
                    </a>
                  </li>

                  <li className='w-full text-center'>
                    <div className='block py-2 px-4 font-bold text-black'>{state.user ? state.user.name : 'Usuário'}</div>
                  </li>
                  <li className='w-full text-center'>
                    <a className='block py-2 px-4 cursor-pointer text-red-600 hover:bg-gray-100' onClick={handleLogoutClick}>
                      Sair
                    </a>
                  </li>
                </>
              )}

              {!state.isLoggedIn && (
                <li className='w-full text-center'>
                  <a className='block py-2 px-4 cursor-pointer bg-black text-white rounded-md mx-auto w-3/4' onClick={() => handleNavigation('/login')}>
                    Entrar
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
