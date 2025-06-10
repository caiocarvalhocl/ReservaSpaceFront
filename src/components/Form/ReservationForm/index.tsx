import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Clock } from 'lucide-react';
import dayjs from 'dayjs';
import { useState, type FormEvent } from 'react';
import { useUserContext } from '../../../hooks/useUserContext';
import { useNavigate } from 'react-router';

export function ReservationForm() {
  const navigate = useNavigate();
  const { state } = useUserContext();
  const [date, setDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const timeSlots = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.isLoggedIn) {
      alert('Loge na sua conta para conseguir reservar um espaco!');
      navigate('/login');
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='grid grid-cols-subgrid'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='flex flex-col text-6xl gap-2'>
              <label className='text-xl sm:text-2xl'>Selecione uma data</label>
              <DatePicker
                value={date}
                onChange={newValue => setDate(dayjs(newValue))}
                slotProps={{
                  textField: {
                    InputProps: {
                      style: {
                        fontSize: '1.4rem',
                      },
                    },
                  },
                  day: {
                    sx: {
                      fontSize: '1.5rem',
                    },
                  },
                }}
              />
            </div>
          </LocalizationProvider>
        </div>

        <div className='grid grid-cols-subgrid'>
          <h3 className='text-xl sm:text-2xl my-4 sm:m-0 sm:mb-2'>
            Horarios disponiveis
          </h3>
          <div className='flex md:flex-row flex-wrap gap-4'>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                className={`w-full max-w-32 flex gap-2 items-center justify-center bg-gray-200 p-2 rounded-md cursor-pointer ${selectedTime === index ? 'bg-green-300 text-white' : ''}`}
                onClick={() => setSelectedTime(index)}
              >
                <Clock size={15} />
                <p className='text-xl sm:text-2xl flex'>{time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type='submit'
        className='bg-black text-white w-full p-2 font-semibold text-xl sm:text-2xl cursor-pointer'
      >
        Reservar
      </button>
    </form>
  );
}
