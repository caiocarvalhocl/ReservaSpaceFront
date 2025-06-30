import { X } from 'lucide-react';
import type { PopupProps } from '../../interfaces/components';

export function Popup({ children, setIsOpen, title, subtitle }: PopupProps) {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute h-full w-full bg-black opacity-70'></div>
      <div className='bg-white p-6 rounded-lg shadow-xl w-full flex flex-col gap-4 max-w-11/12 sm:max-w-2xl mx-auto relative'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center'>
            <h1 className='font-bold text-3xl'>{title}</h1>

            <div className='ml-auto cursor-pointer'>
              <X onClick={setIsOpen} />
            </div>
          </div>

          <p className='text-gray-400 text-xl'>{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
