import { ArrowLeft, CalendarDays } from 'lucide-react';
import { LoginForm } from '../../components/Form/LoginForm';
import { useNavigate } from 'react-router';

export function Login() {
  const navigate = useNavigate();

  return (
    <section className='bg-cyan-50 min-h-screen w-full py-10'>
      <div>
        <div className='flex flex-col h-full items-center gap-24'>
          <div className='flex flex-col items-center gap-8'>
            <div
              className='flex items-center gap-2 cursor-pointer'
              onClick={() => navigate('/')}
            >
              <ArrowLeft color='blue' />
              <a className='text-blue-800'>Voltar ao inicio</a>
            </div>
            <div className='flex items-center gap-4'>
              <CalendarDays color='blue' size='2.25rem' />
              <h1 className='text-4xl'>ReservaSpace</h1>
            </div>

            <p className='text-center text-xl text-gray-500'>
              Acesse sua conta para gerenciar suas reservas
            </p>
          </div>

          <div className='p-4 w-full sm:max-w-3xl lg:max-w-4xl'>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
