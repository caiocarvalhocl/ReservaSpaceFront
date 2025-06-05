import { CalendarDays } from 'lucide-react';

export function Footer() {
  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <div className='flex items-center space-x-2 mb-4'>
              <CalendarDays className='w-6 h-6' />
              <span className='text-lg font-bold'>ReservaSpace</span>
            </div>
            <p className='text-gray-400'>
              Plataforma completa para reserva de espaços coletivos.
            </p>
          </div>
          <div>
            <h3 className='font-semibold mb-4'>Espaços</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>Salas de Reunião</li>
              <li>Quadras Esportivas</li>
              <li>Auditórios</li>
              <li>Coworking</li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold mb-4'>Suporte</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>Central de Ajuda</li>
              <li>Contato</li>
              <li>Termos de Uso</li>
              <li>Política de Privacidade</li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold mb-4'>Contato</h3>
            <div className='space-y-2 text-gray-400 overflow-x-clip'>
              <p>📧 caioalmeidacarvalholima@gmail.com</p>
              <p>📞 (99) 98124-9825</p>
              <p>📍 Dois Vizinhos, PR</p>
            </div>
          </div>
        </div>
        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>&copy; 2025 ReservaSpace. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
