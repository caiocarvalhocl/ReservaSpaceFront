import { useState, type FormEvent } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';

export function RegisterForm() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const registerSuccess = await register({ name, email, password, phone });

      if (registerSuccess) {
        const loginSuccess = await login({ email, password });
        if (loginSuccess) navigate('/');
      }
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
            <p className='text-center text-xl md:text-2xl lg:text-3xl'>Digite suas credencias para cria sua conta</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col'>
                <label htmlFor='name'>Nome</label>
                <input type='text' id='name' value={name} onChange={e => setName(e.target.value)} className='p-2 outline outline-gray-300' required />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='email'>E-mail</label>
                <input type='email' id='email' value={email} onChange={e => setEmail(e.target.value)} className='p-2 outline outline-gray-300' required />
              </div>

              <div className='flex flex-col'>
                <label htmlFor='password'>Senha</label>
                <input type='password' id='password' value={password} onChange={e => setPassword(e.target.value)} className='p-2 outline outline-gray-300' required />
              </div>

              <div className='flex flex-col'>
                <label htmlFor='phone'>Phone</label>
                <input type='text' id='phone' value={phone} onChange={e => setPhone(e.target.value)} className='p-2 outline outline-gray-300' required />
              </div>
            </div>

            <div>
              <button type='submit' className='bg-black p-4 my-6 text-white w-full font-bold cursor-pointer'>
                Criar Conta
              </button>
            </div>

            <div className='flex items-center gap-2 justify-center'>
              <p className='text-xl sm:text-2xl'>Ja possui uma conta?</p>
              <a className='text-xl sm:text-2xl text-blue-400 cursor-pointer' onClick={() => navigate('/login')}>
                Entrar
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
