import type { ButtonProps } from '../../../interfaces/components/common';

export function Button({ type = 'button', value, onClick, colorType, children, className, hoverType, ...props }: ButtonProps) {
  const colors: Record<string, string> = {
    main: 'bg-black text-white',
    paper: 'bg-white text-black',
    primary: '',
    secondary: 'bg-gray-500 text-white',
  };

  const hovers: Record<string, string> = {
    main: 'hover:bg-white hover:text-black',
    paper: 'hover:bg-black hover:text-white',
    primary: '',
    secondary: 'hover:bg-gray-500 hover:text-cyan-100',
    red: 'hover:bg-gray-400 hover:text-red-900',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex justify-center items-center gap-2 p-2 ${colors[colorType]} ${hovers[hoverType ? hoverType : '']} text-base md:text-lg sm:text-2xl rounded-md cursor-pointer filter hover:brightness-150 transition-all duration-200 ${className}`}
      value={value}
      {...props}
    >
      {children}
      {value}
    </button>
  );
}
