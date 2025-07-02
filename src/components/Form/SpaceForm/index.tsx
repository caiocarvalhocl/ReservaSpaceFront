import { useState, type FormEvent } from 'react';
import type { SpaceFormRequest } from '../../../interfaces/services';
import { X } from 'lucide-react';
import { updateFormData } from '../../../utils/updateFormData';
import { Button } from '../../common/Button';
import { Input, SelectInput, Textarea } from '../../common/Input';
import { spaceStatusMap, spaceTypeMap, type SpaceStatus, type SpaceTypes } from '../../../types/components';
import { createSpace, updateSpace } from '../../../services/api';
import type { SpaceFormProps } from '../../../interfaces/components';
import { ResourceSelector } from '../../common/Selector/ResourceSelector';

const initialFormState: SpaceFormRequest = {
  name: '',
  type: 'auditorium' as SpaceTypes,
  capacity: 0,
  imageUrl: null,
  price: 0,
  description: '',
  status: 'active' as SpaceStatus,
  resources: [],
};

export function SpaceForm({ setIsOpen, isEditing = false, spaceData }: SpaceFormProps) {
  const [formData, setFormData] = useState<SpaceFormRequest>(!isEditing ? initialFormState : spaceData!);

  const spaceTypeOptions = [...Object.entries(spaceTypeMap).map(([value, label]) => ({ value, label: label as string }))];
  const spaceStatusOptions = [...Object.entries(spaceStatusMap).map(([value, label]) => ({ value, label: label as string }))];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let success = null;
      if (!isEditing) success = await createSpace(formData);
      if (isEditing) success = await updateSpace(spaceData?.id!, formData);

      if (success) setIsOpen();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 p-2'>
      <div className='absolute h-full w-full bg-black opacity-70'></div>
      <div className='bg-white p-6 rounded-lg shadow-xl w-full flex flex-col gap-4 max-w-11/12 sm:max-w-2xl mx-auto relative'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center'>
            <h1 className='font-bold text-3xl'>{`${isEditing ? 'Editar' : 'Criar novo'} Espaço`}</h1>

            <div className='ml-auto cursor-pointer'>
              <X onClick={setIsOpen} />
            </div>
          </div>

          <p className='text-gray-400 text-xl'>Preencha as informacoes do espaço</p>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
              <Input
                type='text'
                id='name'
                value={formData.name}
                onChange={e => updateFormData({ key: e.target.id as keyof SpaceFormRequest, value: e.target.value, setState: setFormData })}
                required
                labelText='Nome'
              />

              <Input
                type='number'
                id='capacity'
                value={formData.capacity}
                onChange={e => updateFormData({ key: e.target.id as keyof SpaceFormRequest, value: e.target.value, setState: setFormData })}
                labelText='Capacidade'
                required
              />

              <Input
                type='number'
                id='price'
                value={formData.price}
                onChange={e => updateFormData({ key: e.target.id as keyof SpaceFormRequest, value: e.target.value, setState: setFormData })}
                labelText='Preço por Hora (R$)'
                required
              />

              <SelectInput
                labelText='Tipo'
                id='type'
                value={formData.type}
                onChange={e => updateFormData({ key: e.target.id as keyof SpaceFormRequest, value: e.target.value, setState: setFormData })}
                options={spaceTypeOptions}
              />

              <SelectInput
                labelText='Status'
                id='status'
                value={formData.status}
                onChange={e => updateFormData({ key: e.target.id as keyof SpaceFormRequest, value: e.target.value, setState: setFormData })}
                options={spaceStatusOptions}
              />
            </div>

            <div className='col-span-1 md:col-span-2 my-4'>
              <label className='text-lg md:text-xl'>Recursos:</label>
              <ResourceSelector
                onResourcesChange={newResources => updateFormData({ key: 'resources', value: newResources, setState: setFormData })}
                initialSelectedResources={formData.resources}
              />
            </div>

            <div className='col-span-2 my-2'>
              <Textarea
                id='description'
                value={formData.description}
                onChange={e => updateFormData({ key: e.target.id as keyof SpaceFormRequest, value: e.target.value, setState: setFormData })}
                labelText='Descrição'
                required
              />

              <div className='col-span-2 my-2'>
                <Input
                  id='imageUrl'
                  type='file'
                  // value={formData.imageUrl}
                  onChange={e => updateFormData({ key: e.target.id as keyof SpaceFormRequest, value: e.target.value, setState: setFormData })}
                  className='p-10 flex items-center justify-center'
                  labelText='Imagem do Espaço'
                />
              </div>
            </div>

            <div className='col-span-2 flex gap-4 w-fit ml-auto mt-4'>
              <Button colorType='paper' hoverType='secondary' className='py-2 px-4 font-bold outline outline-gray-300 text-base md:text-lg' onClick={setIsOpen} value='Cancelar' />
              <Button type='submit' colorType='main' hoverType='paper' className='py-2 px-4 font-bold' value={`${isEditing ? 'Editar' : 'Criar '} Espaços`} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
