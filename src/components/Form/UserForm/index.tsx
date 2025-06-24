import { X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { userRolesMap, type UserRole } from '../../../types/components';
import { createUser } from '../../../services/api';

export function UserForm({ setIsOpen }: { setIsOpen: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'regular' as UserRole,
  });

  const roleOptions = [...Object.entries(userRolesMap).map(([value, label]) => ({ value, label: label as string }))];

  const handleChangeFormData = (targetId: string, value: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [targetId]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await createUser(formData);

      console.log(response);

      if (response) setIsOpen();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute h-full w-full bg-black opacity-70'></div>
      <div className='bg-white p-6 rounded-lg shadow-xl w-full flex flex-col gap-4 max-w-11/12 sm:max-w-2xl mx-auto relative'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center'>
            <h1 className='font-bold text-3xl'>Adicionar Novo Usuario</h1>

            <div className='ml-auto'>
              <X onClick={setIsOpen} />
            </div>
          </div>

          <p className='text-gray-400 text-xl'>Preencha as informacoes do novo usuario</p>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex flex-col'>
                <label htmlFor='name' className='text-lg md:text-xl'>
                  Nome
                </label>
                <input
                  type='text'
                  id='name'
                  value={formData.name}
                  onChange={e => handleChangeFormData(e.target.id, e.target.value)}
                  className='p-2 outline outline-gray-300 rounded-md text-lg md:text-xl'
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='email' className='text-lg md:text-xl'>
                  E-mail
                </label>
                <input
                  type='email'
                  id='email'
                  value={formData.email}
                  onChange={e => handleChangeFormData(e.target.id, e.target.value)}
                  className='p-2 outline outline-gray-300 rounded-md text-lg md:text-xl'
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='password' className='text-lg md:text-xl'>
                  Senha
                </label>
                <input
                  type='password'
                  id='password'
                  value={formData.password}
                  onChange={e => handleChangeFormData(e.target.id, e.target.value)}
                  className='p-2 outline outline-gray-300 rounded-md text-lg md:text-xl'
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='phone' className='text-lg md:text-xl'>
                  Telefone
                </label>
                <input
                  type='text'
                  id='phone'
                  value={formData.phone}
                  onChange={e => handleChangeFormData(e.target.id, e.target.value)}
                  className='p-2 outline outline-gray-300 rounded-md text-lg md:text-xl'
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='role' className='text-lg md:text-xl'>
                  Função
                </label>
                <select
                  id='role'
                  value={formData.role}
                  onChange={e => handleChangeFormData(e.target.id, e.target.value)}
                  className='p-2 outline outline-gray-300 rounded-md capitalize text-lg md:text-xl'
                  required
                >
                  {roleOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='col-span-1 md:col-span-2 flex gap-4 w-fit ml-auto'>
                <button
                  type='button'
                  className='bg-white py-2 px-4 text-black font-bold cursor-pointer outline outline-gray-300 rounded-md text-base md:text-lg'
                  onClick={setIsOpen}
                >
                  Cancelar
                </button>
                <button type='submit' className='bg-black py-2 px-4 text-white font-bold cursor-pointer rounded-md text-base md:text-lg'>
                  Criar Conta
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
