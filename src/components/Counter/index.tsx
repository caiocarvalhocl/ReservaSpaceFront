import type { CounterProps } from '../../interfaces/components';

export function Counter({ title, count, icon, color }: CounterProps) {
  return (
    <div className='bg-white p-6 outline outline-gray-300 rounded-lg'>
      <div className='flex items-center'>
        <div className='flex flex-col gap-2 w-fit items-start'>
          <h2 className='text-xl lg:text-6xl text-gray-600'>{title}</h2>
          <h3 className={`text-4xl lg:text-8xl font-bold text-${color}-700`}>
            {count}
          </h3>
        </div>

        <div className='ml-auto'>{icon}</div>
      </div>
    </div>
  );
}
