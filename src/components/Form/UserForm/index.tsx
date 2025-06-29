import { X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { userRolesMap, type UserRole } from '../../../types/components';
import { createUser } from '../../../services/api';
import { updateFormData } from '../../../utils/updateFormData';
import type { RegisterFormProps } from '../../../interfaces/auth/auth';
import { Input, SelectInput } from '../../common/Input';
import { Button } from '../../common/Button';

export function UserForm({ setIsOpen }: { setIsOpen: () => void }) {
  const [formData, setFormData] = useState<RegisterFormProps>({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'regular' as UserRole,
  });

  const roleOptions = [...Object.entries(userRolesMap).map(([value, label]) => ({ value, label: label as string }))];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await createUser(formData);

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
              <X onClick={setIsOpen} className='cursor-pointer' />
            </div>
          </div>

          <p className='text-gray-400 text-xl'>Preencha as informacoes do novo usuario</p>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                id='name'
                type='text'
                labelText='Nome'
                value={formData.name}
                onChange={e => updateFormData({ key: e.target.id as keyof RegisterFormProps, value: e.target.value, setState: setFormData })}
                required
              />
              <Input
                labelText='E-mail'
                type='email'
                id='email'
                value={formData.email}
                onChange={e => updateFormData({ key: e.target.id as keyof RegisterFormProps, value: e.target.value, setState: setFormData })}
                required
              />
              <Input
                id='password'
                type='password'
                labelText='Senha'
                value={formData.password}
                onChange={e => updateFormData({ key: e.target.id as keyof RegisterFormProps, value: e.target.value, setState: setFormData })}
                required
              />
              <Input
                type='text'
                id='phone'
                labelText='Telefone'
                value={formData.phone}
                onChange={e => updateFormData({ key: e.target.id as keyof RegisterFormProps, value: e.target.value, setState: setFormData })}
                className='p-2 outline outline-gray-300 rounded-md text-lg md:text-xl'
                required
              />

              <SelectInput
                labelText='Função'
                id='role'
                value={formData.role}
                onChange={e => updateFormData({ key: e.target.name as keyof RegisterFormProps, value: e.target.value, setState: setFormData })}
                options={roleOptions}
                required
              />

              <div className='col-span-1 md:col-span-2 flex gap-4 w-fit ml-auto'>
                <Button colorType='paper' hoverType='paper' onClick={setIsOpen} value='Cancelar' className='outline outline-gray-300' />
                <Button colorType='main' hoverType='secondary' onClick={setIsOpen} value='Criar Conta' className='font-bold' />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
