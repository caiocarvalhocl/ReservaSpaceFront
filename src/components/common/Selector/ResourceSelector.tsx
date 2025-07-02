import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ResourceSelectorProps } from '../../../interfaces/components/common';
import { getAllResources } from '../../../services/api';
import type { ResourceRequest } from '../../../interfaces/services';
import { useAuth } from '../../../hooks/useAuth';
import { Input } from '../Input';

interface Resource {
  id: number;
  name: string;
}

export function ResourceSelector({ onResourcesChange, initialSelectedResources = [] }: ResourceSelectorProps) {
  const { state } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [availableResources, setAvailableResources] = useState<Resource[]>([]);
  const [selectedResourceIds, setSelectedResourceIds] = useState<number[]>([]);
  const [newResourceName, setNewResourceName] = useState('');
  const [showNewResourceInput, setShowNewResourceInput] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data: Resource[] = await getAllResources();
        setAvailableResources(data);

        const initialIds = initialSelectedResources.filter(res => res.id !== undefined).map(res => res.id!);

        setSelectedResourceIds(initialIds);
      } catch (error) {
        console.error('Falha ao buscar recursos:', error);
      }
    };
    fetchResources();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const emitChanges = useCallback(() => {
    const currentSelected: ResourceRequest[] = [];

    selectedResourceIds.forEach(id => {
      const resource = availableResources.find(res => res.id === id);
      if (resource) {
        currentSelected.push({ id: resource.id, name: resource.name });
      }
    });

    if (newResourceName.trim() !== '') {
      currentSelected.push({ name: newResourceName.trim() });
    }

    onResourcesChange(currentSelected);
  }, [selectedResourceIds, availableResources, newResourceName]);

  useEffect(() => {
    emitChanges();
  }, [selectedResourceIds, newResourceName, emitChanges]);

  const handleToggleDropdown = () => setIsOpen(prev => !prev);

  const handleCheckboxChange = (resourceId: number, isChecked: boolean) => {
    setSelectedResourceIds(prev => {
      if (isChecked) {
        return [...prev, resourceId];
      } else {
        return prev.filter(id => id !== resourceId);
      }
    });
  };

  const handleNewResourceOptionClick = () => setShowNewResourceInput(prev => !prev);

  const displaySelectedText = () => {
    const selectedCount = selectedResourceIds.length;
    const newResourceExists = newResourceName.trim() !== '' && showNewResourceInput;

    if (selectedCount === 0 && !newResourceExists) return 'Selecionar Recursos';

    let parts: string[] = [];

    if (selectedCount > 0) parts.push(`${selectedCount} Recurso(s) Selecionado(s)`);

    if (newResourceExists) parts.push(`Novo: "${newResourceName.trim()}"`);

    return parts.join(' e ');
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <div className='w-full p-2 border border-gray-300 rounded-md cursor-pointer flex justify-between items-center text-lg md:text-xl' onClick={handleToggleDropdown}>
        <span>{displaySelectedText()}</span>
        {isOpen ? <ChevronUp className='w-5 h-5' /> : <ChevronDown className='w-5 h-5' />}
      </div>

      {isOpen && (
        <div className='absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto'>
          <ul className='py-1'>
            {state.user?.role === 'admin' && (
              <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between' onClick={handleNewResourceOptionClick}>
                <span>Outro / Novo Recurso</span>
                {showNewResourceInput && <span className='text-blue-500 ml-2'>✔</span>}
              </li>
            )}
            {showNewResourceInput && (
              <li className='px-4 py-2'>
                <Input
                  placeholder='Nome do novo recurso'
                  value={newResourceName}
                  onChange={e => setNewResourceName(e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded-md'
                  autoFocus
                />
              </li>
            )}

            {showNewResourceInput && availableResources.length > 0 && <hr className='my-1 border-gray-200' />}

            {availableResources.map(resource => (
              <li key={resource.id} className='px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between'>
                <span>{resource.name}</span>
                <Input
                  type='checkbox'
                  checked={selectedResourceIds.includes(resource.id)}
                  onChange={e => handleCheckboxChange(resource.id, e.target.checked)}
                  onClick={e => e.stopPropagation()}
                  className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
