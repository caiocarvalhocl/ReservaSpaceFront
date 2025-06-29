import { useState, type FormEvent } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { Button } from '../../common/Button';

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const success = await login({ email, password });
      if (success) navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='bg-white p-4'>
        <div className='flex flex-col gap-4 max-w-11/12 mx-auto'>
          <div className='flex flex-col items-center gap-4 py-4'>
            <h2 className='text-3xl md:text-4xl font-bold'>Entrar</h2>
            <p className='text-center text-xl md:text-2xl lg:text-3xl'>Digite suas credencias para acessar sua conta</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col'>
                <label htmlFor='email'>E-mail</label>
                <input type='email' id='email' value={email} onChange={e => setEmail(e.target.value)} className='p-2 outline outline-gray-300' required />
              </div>

              <div className='flex flex-col'>
                <label htmlFor='password'>Senha</label>
                <input type='password' id='password' value={password} onChange={e => setPassword(e.target.value)} className='p-2 outline outline-gray-300' required />
              </div>

              <div className='flex items-center'>
                <div className='flex gap-4 items-center'>
                  <input type='checkbox' id='checkbox' />
                  <label htmlFor='checkbox' className='text-xl sm:text-2xl'>
                    Lembrar de mim
                  </label>
                </div>
                <a className='text-xl sm:text-2xl text-blue-400 ml-auto cursor-pointer'>Esqueceu a senha?</a>
              </div>
            </div>

            <div>
              <Button type='submit' colorType='main' hoverType='secondary' className='p-4 my-6 w-full font-bold' value='Entrar' />
            </div>

            <div className='flex items-center gap-2 justify-center'>
              <p className='text-xl sm:text-2xl'>Nao tem uma conta?</p>
              <a className='text-xl sm:text-2xl text-blue-400 cursor-pointer' onClick={() => navigate('/register')}>
                Criar Conta
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
