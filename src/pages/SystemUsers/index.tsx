import { useCallback, useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import type { UserInfo } from '../../interfaces/auth/user';
import { getAllUsers, updateMultipleUsers } from '../../services/api';
import { getCounters } from '../../utils/getCounters';
import { Counter } from '../../components/Counter';
import { Search } from '../../components/Search';
import type { FilterField } from '../../interfaces/components';
import { userRolesMap, userStatusMap, type UserRole, type UserStatus } from '../../types/components';
import { UserCard } from '../../components/UserCard';
import { useAuth } from '../../hooks/useAuth';
import { UserForm } from '../../components/Form/UserForm';
import { Button } from '../../components/common/Button';
import { updateFormData } from '../../utils/updateFormData';
import { Input, SelectInput } from '../../components/common/Input';
import { Popup } from '../../components/Popup';
import type { UserUpdateRequest } from '../../interfaces/auth/auth';

export function SystemUsers() {
  const { state } = useAuth();
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<{ id: number }[]>([]);
  const [isPopUpEditOpen, setIsPopupEditOpen] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<Record<string, string>>({
    searchTerm: '',
    status: 'all',
    role: 'all',
  });
  const [editFormData, setEditFormData] = useState<UserUpdateRequest>({
    id: 0,
    role: 'regular' as UserRole,
    status: 'active' as UserStatus,
  });
  const loggedUserId = state.user?.id;

  const handleFilterChange = (fieldName: string, value: string) => updateFormData({ key: fieldName, value, setState: setCurrentFilters });
  const counters = getCounters({ counterType: 'users', counter: users });
  const roleOptions = [...Object.entries(userRolesMap).map(([value, label]) => ({ value, label: label as string }))];
  const statusOptions = [...Object.entries(userStatusMap).map(([value, label]) => ({ value, label: label as string }))];

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

  const handleSubmit = async (e: React.FormEvent, { role, status }: UserUpdateRequest) => {
    e.preventDefault();

    const usersToUpdate = selectedUsers.map(user => ({
      id: user.id,
      status,
      role,
    }));

    try {
      const response = await updateMultipleUsers(usersToUpdate);
      if (response) handleEditPopupOpen();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleUserForm = () => setIsUserFormOpen(prev => !prev);
  const handleEditPopupOpen = () => setIsPopupEditOpen(prev => !prev);

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
          <Search filters={userFilterFields} onFilterChange={handleFilterChange} />
          <div className='my-6'>
            {selectedUsers.length > 0 && (
              <div className='bg-blue-100 p-4 max-w-full mx-auto flex items-center rounded-lg'>
                <div>
                  <p className='text-base md:text-lg text-blue-700'>{selectedUsers.length} usuário(s) selecionado(s)</p>
                </div>
                <form className='ml-auto flex gap-4 items-center' onSubmit={e => handleSubmit(e, { id: 0, role: editFormData!.role!, status: editFormData!.status! })}>
                  <Button id='edit' colorType='paper' onClick={handleEditPopupOpen} className='text-base md:text-lg' hoverType='secondary' value='Editar' />
                  {isPopUpEditOpen && (
                    <Popup title='Editar Usuário(s)' subtitle='Aviso este formulario altera os dados de todos os usuarios selecionados' setIsOpen={handleEditPopupOpen}>
                      <div className='flex flex-col gap-4'>
                        <SelectInput
                          labelText='Função'
                          id='role'
                          value={editFormData.role}
                          onChange={e => updateFormData({ key: e.target.id as keyof UserUpdateRequest, value: e.target.value, setState: setEditFormData })}
                          options={roleOptions}
                          required
                        />

                        <SelectInput
                          labelText='Status'
                          id='status'
                          value={editFormData.status}
                          onChange={e => updateFormData({ key: e.target.id as keyof UserUpdateRequest, value: e.target.value, setState: setEditFormData })}
                          options={statusOptions}
                          required
                        />
                      </div>

                      <div className='flex gap-4 w-fit ml-auto'>
                        <Button colorType='paper' hoverType='paper' onClick={handleEditPopupOpen} value='Cancelar' className='outline outline-gray-300' />
                        <Button type='submit' colorType='main' hoverType='secondary' value={`Editar usuário(s) selecionado(s)`} className='font-bold' />
                      </div>
                    </Popup>
                  )}
                </form>
              </div>
            )}
          </div>
          <div className='bg-white p-4 rounded-xl shadow-md overflow-x-auto'>
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
