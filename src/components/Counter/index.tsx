import type { CounterProps } from '../../interfaces/components';

export function Counter({ title, count, icon, color }: CounterProps) {
  const colorMap: Record<string, string> = {
    red: 'text-red-900',
    blue: 'text-blue-900',
    green: 'text-green-800',
    purple: 'text-purple-900',
    cyan: 'text-cyan-300',
  };

  const textColorClass = colorMap[color] || 'text-black';

  return (
    <div className='bg-white p-6 outline outline-gray-300 w-full md:max-w-sm rounded-lg'>
      <div className='flex items-center'>
        <div className='flex flex-col gap-2 w-fit items-start'>
          <h2 className='text-xl md:text-base lg:text-xl text-gray-600'>{title}</h2>
          <h3 className={`text-4xl md:text-2xl lg:text-3xl font-bold ${textColorClass}`}>{count}</h3>
        </div>

        <div className='ml-auto md:pl-4'>{icon}</div>
      </div>
    </div>
  );
}
