import React, { useCallback, useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import type { UserInfo } from '../../interfaces/auth/user';
import { getAllUsers } from '../../services/api';
import { getCounters } from '../../utils/getCounters';
import { Counter } from '../../components/Counter';
import { Search } from '../../components/Search';
import type { FilterField } from '../../interfaces/components';
import { userRolesMap, userStatusMap } from '../../types/components';
import { UserCard } from '../../components/UserCard';

export function SystemUsers() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentFilters, setCurrentFilters] = useState<Record<string, string>>({
    searchTerm: '',
    status: 'all',
    role: 'all',
  });

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const data = await getAllUsers();
        console.log('all users', data);
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (currentFilters.status !== 'all') {
      filtered = filtered.filter(user => user.status === currentFilters.status);
    }

    if (currentFilters.role !== 'all') {
      filtered = filtered.filter(user => user.role === currentFilters.role);
    }

    if (currentFilters.searchTerm.trim() !== '') {
      filtered = filtered.filter(user => user.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase()));
    }

    setFilteredUsers(filtered);
  }, [currentFilters, users]);

  const handleFilterChange = (fieldName: string, value: string) => {
    setCurrentFilters(prevFilters => ({
      ...prevFilters,
      [fieldName]: value,
    }));
  };

  const userFilterFields: FilterField[] = [
    {
      name: 'searchTerm',
      label: 'Buscar usuarios',
      type: 'text',
      placeholder: 'Digite o nome do usuario...',
    },
    {
      name: 'role',
      label: 'Função',
      type: 'select',
      options: [{ value: 'all', label: 'Todos' }, ...Object.entries(userRolesMap).map(([value, label]) => ({ value, label: label as string }))],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [{ value: 'all', label: 'Todos' }, ...Object.entries(userStatusMap).map(([value, label]) => ({ value, label: label as string }))],
    },
  ];

  const counters = getCounters({ counterType: 'users', counter: users });

  const userFields = [
    {
      name: 'userInfo',
      label: 'Usuário',
    },
    {
      name: 'role',
      label: 'Função',
    },
    {
      name: 'status',
      label: 'Status',
    },
    // {
    //   name: 'reservations',
    //   label: 'Reservas',
    // },
  ];

  useEffect(() => {
    if (filteredUsers.length === 0) {
      setCheckAll(false);
      return;
    }
    // Verifica se todos os usuários *visíveis (filtrados)* estão selecionados
    const allFilteredSelected = filteredUsers.every(user => selectedUsers.includes(user.id));
    setCheckAll(allFilteredSelected);
  }, [selectedUsers, filteredUsers]);

  const handleUserCheckboxChange = useCallback((id: number, isChecked: boolean) => {
    setSelectedUsers(prevSelected => {
      if (isChecked) {
        // Adiciona o ID se estiver sendo marcado e ainda não estiver na lista
        return Array.from(new Set([...prevSelected, id]));
      } else {
        // Remove o ID se estiver sendo desmarcado
        return prevSelected.filter(userId => userId !== id);
      }
    });
  }, []); // useCallback para otimização

  const handleCheckAll = () => {
    setCheckAll(prev => !prev); // Inverte o estado do "selecionar todos"
    if (!checkAll) {
      // Se o checkbox "selecionar todos" estiver sendo marcado
      // Seleciona todos os usuários filtrados
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      // Se o checkbox "selecionar todos" estiver sendo desmarcado
      // Limpa todos os usuários selecionados
      setSelectedUsers([]);
    }
  };

  return (
    <Layout>
      <div className='w-full xl:max-w-9/12 mx-auto'>
        <div className='p-6'>
          <div className='flex items-center flex-wrap'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-5xl lg:text-7xl font-bold'>Gerenciamento de Usuários</h1>
              <p className='text-2xl lg:text-3xl text-gray-600'>Gerencie todos os usuários do sistema e monitore atividades</p>
            </div>

            <div className='bg-black p-2 rounded-md flex items-center ml-auto'>
              <button className='text-base sm:text-lg lg:text-xl font-semibold text-white cursor-pointer'>
                <span className='text-base sm:text-lg lg:text-xl mx-2'>+</span> Adicionar Usuário
              </button>
            </div>
          </div>

          <div className='flex flex-col md:flex-row gap-8 md:gap-4 my-8'>
            {counters.map((counter, index) => (
              <Counter key={index} title={counter.title} count={counter.count} icon={counter.icon} color={counter.color} />
            ))}
          </div>

          <div className='bg-white pb-4'>
            <Search filters={userFilterFields} onFilterChange={handleFilterChange} />
            {selectedUsers.length > 0 && (
              <div className='bg-blue-100 p-4 max-w-11/12 mx-auto flex items-center rounded-lg'>
                <div>
                  <p className='text-base md:text-lg text-blue-700'>{selectedUsers.length} usuário(s) selecionado(s)</p>
                </div>
                <div className='ml-auto flex gap-4 items-center'>
                  <button className='text-base md:text-lg bg-white p-2 rounded-md hover:bg-gray-100 cursor-pointer'>Ativar</button>
                  <button className='text-base md:text-lg bg-white p-2 rounded-md hover:bg-gray-100 cursor-pointer'>Inativar</button>
                  <button className='text-base md:text-lg bg-white p-2 rounded-md hover:bg-gray-100 cursor-pointer'>Suspender</button>
                </div>
              </div>
            )}
          </div>

          <div className='bg-white my-6 p-4 rounded-xl shadow-md overflow-x-auto'>
            <div className={`grid gap-4 items-center`} style={{ gridTemplateColumns: `min-content repeat(${userFields.length}, minmax(0, 1fr))` }}>
              <div className='flex justify-center'>
                <input type='checkbox' className='w-5 h-5' checked={checkAll} onChange={handleCheckAll} />
              </div>
              {userFields.map((col, index) => (
                <div key={index} className='flex justify-center'>
                  <h4 className='text-lg text-gray-400 text-center font-semibold'>{col.label}</h4>
                </div>
              ))}

              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <React.Fragment key={user.id || index}>
                    <UserCard
                      userInfo={user}
                      fields={userFields.map(field => field.name)}
                      onChangeCheckBox={handleUserCheckboxChange} // Passa a nova função
                      isSelected={selectedUsers.includes(user.id)} // Indica se o usuário está selecionado
                    />
                  </React.Fragment>
                ))
              ) : (
                <div className='col-span-full text-center text-gray-500 py-8'>Nenhum usuário encontrado com os filtros aplicados.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
