import { useState } from 'react';
import { CalendarDays, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import type { NavItem } from '../../interfaces/components';
import { hasRequiredRole } from '../../utils/authUtils';
import type { UserRole } from '../../types/components';

export function Header() {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userRole: UserRole = state.user ? (state.user.role as UserRole) : 'regular';

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

  const menuNavigations: NavItem[] = [
    {
      path: '/users',
      title: 'Usuarios do sistema',
      minRole: 'admin',
      loggedInOnly: true,
    },
    {
      path: '/myspaces',
      title: 'Meus Espaços',
      minRole: 'manager',
      loggedInOnly: true,
    },
    {
      path: '/myreservations',
      title: 'Minhas Reservas',
      loggedInOnly: true,
    },
    {
      path: '/login',
      title: 'Entrar',
      loggedOutOnly: true,
      onClick: () => handleNavigation('/login'),
    },

    {
      path: '#',
      title: state.user ? state.user.name : 'Usuário',
      loggedInOnly: true,
      isUserDisplay: true,
    },

    {
      path: '#',
      title: 'Sair',
      loggedInOnly: true,
      onClick: handleLogoutClick,
      isLogout: true,
    },
  ];

  const shouldDisplayNavItem = (item: NavItem) => {
    const hasRolePermission = hasRequiredRole(userRole, item.minRole);

    if (item.loggedInOnly && !state.isLoggedIn) return false;
    if (item.loggedOutOnly && state.isLoggedIn) return false;

    return hasRolePermission;
  };

  const renderNavItems = (isMobile: boolean) => (
    <>
      {menuNavigations.map((item, index) => {
        if (!shouldDisplayNavItem(item)) return null;

        if (item.isUserDisplay) {
          return (
            <li
              key={item.path + index}
              className={`bg-black p-2 rounded-md flex items-center cursor-pointer truncate ${isMobile ? 'bg-inherit text-center' : ''}`}
              onMouseEnter={() => !isMobile && setShowLogout(true)}
              onMouseLeave={() => !isMobile && setShowLogout(false)}
            >
              <a className={`cursor-pointer font-bold text-black ${!isMobile ? 'text-white' : ''}`}>{item.title}</a>
              {!isMobile && showLogout && item.isUserDisplay && (
                <div className='absolute top-full mt-2 right-0 bg-white text-black shadow-lg rounded-md p-4 text-xl z-10'>
                  <span className='cursor-pointer' onClick={handleLogoutClick}>
                    Sair
                  </span>
                </div>
              )}
            </li>
          );
        }

        if (item.isLogout && isMobile) {
          return (
            <li key={item.path + index} className='w-full text-center'>
              <a className='block py-2 px-4 cursor-pointer text-red-600 hover:bg-gray-100' onClick={item.onClick || (() => handleNavigation(item.path))}>
                {item.title}
              </a>
            </li>
          );
        }

        if (!item.isLogout && !item.isUserDisplay) {
          return (
            <li key={item.path + index} className={`flex items-center truncate ${isMobile ? 'w-full justify-center text-center' : ''}`}>
              <a
                className={`cursor-pointer ${isMobile ? 'block py-2 px-4 hover:bg-gray-100' : ''} ${item.loggedOutOnly ? 'bg-black text-white p-2 rounded-md mx-auto w-3/4 sm:w-full font-bold' : ''}`}
                onClick={item.onClick || (() => handleNavigation(item.path))}
              >
                {item.title}
              </a>
            </li>
          );
        }
        return null;
      })}
    </>
  );

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

        <ul className='hidden sm:flex relative gap-2 sm:gap-4 items-center text-base sm:text-xl'>{renderNavItems(false)}</ul>

        {isMobileMenuOpen && (
          <div className='sm:hidden absolute top-full left-0 w-full bg-white shadow-lg rounded-b-md py-4 z-50'>
            <ul className='flex flex-col items-center gap-4 text-lg'>{renderNavItems(true)}</ul>
          </div>
        )}
      </nav>
    </header>
  );
}
