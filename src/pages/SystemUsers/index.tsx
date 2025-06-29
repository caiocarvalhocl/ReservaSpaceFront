import React, { useCallback, useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import type { UserInfo } from '../../interfaces/auth/user';
import { getAllUsers, updateMultipleUsers } from '../../services/api';
import { getCounters } from '../../utils/getCounters';
import { Counter } from '../../components/Counter';
import { Search } from '../../components/Search';
import type { FilterField } from '../../interfaces/components';
import { userRolesMap, userStatusMap, type UserStatus } from '../../types/components';
import { UserCard } from '../../components/UserCard';
import { useAuth } from '../../hooks/useAuth';
import { UserForm } from '../../components/Form/UserForm';
import { Button } from '../../components/common/Button';
import { updateFormData } from '../../utils/updateFormData';
import { Input } from '../../components/common/Input';

export function SystemUsers() {
  const { state } = useAuth();
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<{ id: number }[]>([]);
  const [currentFilters, setCurrentFilters] = useState<Record<string, string>>({
    searchTerm: '',
    status: 'all',
    role: 'all',
  });
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const loggedUserId = state.user?.id;

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const data = await getAllUsers();
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

  const handleFilterChange = (fieldName: string, value: string) => updateFormData({ key: fieldName, value, setState: setCurrentFilters });

  const counters = getCounters({ counterType: 'users', counter: users });

  const userFilterFields: FilterField[] = [
    {
      name: 'searchTerm',
      label: 'Buscar Usuarios',
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
  ];

  useEffect(() => {
    const users = filteredUsers.filter(user => user.id !== loggedUserId);
    if (filteredUsers.length === 0) {
      setCheckAll(false);
      return;
    }

    const allFilteredSelected = users.every(user => selectedUsers.some(selectedUser => selectedUser.id === user.id));
    setCheckAll(allFilteredSelected);
  }, [selectedUsers, filteredUsers]);

  const handleUserCheckboxChange = useCallback((id: number, isChecked: boolean) => {
    if (id === loggedUserId) return;

    setSelectedUsers(prevSelected => {
      if (isChecked) {
        if (!prevSelected.some(user => user.id === id)) {
          return [...prevSelected, { id }];
        }
        return prevSelected;
      } else {
        return prevSelected.filter(user => user.id !== id);
      }
    });
  }, []);

  const handleCheckAll = () => {
    setCheckAll(prev => !prev);
    if (!checkAll) {
      setSelectedUsers(filteredUsers.filter(user => user.id !== loggedUserId).map(user => ({ id: user.id })));
    } else {
      setSelectedUsers([]);
    }
  };

  const onStatusChange = async (target: HTMLButtonElement) => {
    const buttonText = {
      ativar: 'active',
      suspender: 'suspend',
      inativar: 'inactive',
    };

    const text = target.innerText.toLowerCase();
    const clicked = buttonText[text as keyof typeof buttonText];

    const usersToUpdate = selectedUsers.map(user => ({
      id: user.id,
      status: clicked as UserStatus,
    }));

    try {
      await updateMultipleUsers(usersToUpdate);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleUserForm = () => setIsUserFormOpen(prev => !prev);

  return (
    <Layout>
      <div className='w-full xl:max-w-9/12 mx-auto'>
        <div className='p-6'>
          <div className='flex items-center flex-wrap'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-5xl lg:text-7xl font-bold'>Gerenciamento de Usuários</h1>
              <p className='text-2xl lg:text-3xl text-gray-600'>Gerencie todos os usuários do sistema e monitore atividades</p>
            </div>

            <Button
              colorType='main'
              className='p-4 text-base sm:text-lg lg:text-xl font-semibold ml-auto'
              value='Adicionar Usuário'
              onClick={() => setIsUserFormOpen(prev => !prev)}
            />
          </div>

          <div className='flex flex-col md:flex-row gap-8 md:gap-4 my-8'>
            {counters.map((counter, index) => (
              <Counter key={index} title={counter.title} count={counter.count} icon={counter.icon} color={counter.color} />
            ))}
          </div>

          {isUserFormOpen && <UserForm setIsOpen={handleUserForm} />}

          <div className='bg-white pb-4'>
            <Search filters={userFilterFields} onFilterChange={handleFilterChange} />
            {selectedUsers.length > 0 && (
              <div className='bg-blue-100 p-4 max-w-11/12 mx-auto flex items-center rounded-lg'>
                <div>
                  <p className='text-base md:text-lg text-blue-700'>{selectedUsers.length} usuário(s) selecionado(s)</p>
                </div>
                <div className='ml-auto flex gap-4 items-center'>
                  {['Ativar', 'Inativar', 'Suspender'].map((text, index) => (
                    <Button
                      key={index}
                      type='button'
                      colorType='paper'
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => onStatusChange(e.target as HTMLButtonElement)}
                      className='text-base md:text-lg hover:bg-gray-100'
                      hoverType='main'
                      value={text}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className='bg-white my-6 p-4 rounded-xl shadow-md overflow-x-auto'>
            <div className={`grid gap-4 items-center pb-4 overflow-x-auto`} style={{ gridTemplateColumns: `min-content repeat(${userFields.length}, minmax(0, 1fr))` }}>
              <div className='flex justify-center'>
                <Input type='checkbox' className='w-5 h-5' checked={checkAll} onChange={handleCheckAll} />
              </div>
              {userFields.map((col, index) => (
                <div key={index} className='flex justify-center'>
                  <h4 className='text-lg text-gray-400 text-center font-semibold'>{col.label}</h4>
                </div>
              ))}

              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <UserCard
                    key={index}
                    userInfo={user}
                    fields={userFields.map(field => field.name)}
                    onChangeCheckBox={handleUserCheckboxChange}
                    isSelected={selectedUsers.some(selectedUser => selectedUser.id === user.id)}
                  />
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
