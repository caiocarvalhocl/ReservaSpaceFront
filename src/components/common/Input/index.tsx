import type { InputProps, SelectProps, TextAreaProps } from '../../../interfaces/components/common';
import { toCapitalize } from '../../../utils/toCapitalize';

export function Input({ id, type, labelText, className = '', value, onChange, ...rest }: InputProps) {
  return (
    <div className='flex flex-col'>
      {labelText && (
        <label htmlFor={id} className='text-lg md:text-xl mb-1'>
          {labelText}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`p-2 ${type !== 'checkbox' ? 'outline outline-gray-300' : ''} rounded-md text-lg md:text-xl ${className}`}
        {...rest}
      />
    </div>
  );
}

export function Textarea({ id, labelText, className = '', value, onChange, ...rest }: TextAreaProps) {
  return (
    <div className='flex flex-col'>
      {labelText && (
        <label htmlFor={id} className='text-lg md:text-xl mb-1'>
          {labelText}
        </label>
      )}
      <textarea id={id} value={value} onChange={onChange} className={`p-2 outline outline-gray-300 rounded-md text-lg md:text-xl ${className}`} {...rest} />
    </div>
  );
}

export function SelectInput({ id, onChange, value, labelText, options, className, ...rest }: SelectProps) {
  return (
    <div className='flex flex-col mt-auto'>
      {labelText && (
        <label htmlFor={id} className='text-lg md:text-xl mb-1'>
          {labelText}
        </label>
      )}

      <select id={id} value={value} onChange={onChange} className={`p-2 outline outline-gray-300 rounded-md text-lg md:text-xl ${className}`} {...rest}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {toCapitalize(option.label)}
          </option>
        ))}
      </select>
    </div>
  );
}
