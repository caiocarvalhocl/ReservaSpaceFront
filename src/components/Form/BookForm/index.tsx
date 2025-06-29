import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Clock } from 'lucide-react';
import dayjs from 'dayjs';
import { useState, type FormEvent } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { book } from '../../../services/api';
import { Button } from '../../common/Button';

export function BookForm({ spaceId, onSuccess }: { spaceId: number; onSuccess: () => void }) {
  const navigate = useNavigate();
  const { state } = useAuth();
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [selectedStartTime, setSelectedStartTime] = useState<number | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<number | null>(null);

  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.user) {
      navigate('/login');
      return;
    }

    if (selectedStartTime === null || selectedEndTime === null) return;

    try {
      const selectedStartHour = timeSlots[selectedStartTime];
      const selectedEndHour = timeSlots[selectedEndTime];

      const isSameDate = startTime.format('YYYY-MM-DD') === endTime.format('YYYY-MM-DD');

      const startDateTime = dayjs(`${startTime.format('YYYY-MM-DD')}T${selectedStartHour}`);

      const endDateTime = dayjs(`${endTime.format('YYYY-MM-DD')}T${selectedEndHour}`);

      if (isSameDate && !endDateTime.isAfter(startDateTime)) return;

      const payload = {
        spaceId,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      };

      const response = await book(payload);
      if (response) onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTimeSelect = (index: number) => {
    if (selectedStartTime !== null && selectedEndTime !== null) {
      setSelectedStartTime(null);
      setSelectedEndTime(null);
    } else if (selectedStartTime === null) {
      setSelectedStartTime(index);
    } else {
      setSelectedEndTime(index);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
      <div className='grid grid-cols-1 gap-8'>
        <div className='grid grid-cols-subgrid'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='flex flex-col text-6xl gap-2 my-2'>
              <label className='text-xl sm:text-2xl'>Data de Entrada</label>
              <DatePicker
                value={startTime}
                minDate={dayjs(Date.now())}
                onChange={newValue => {
                  setStartTime(dayjs(newValue));
                  if (newValue && endTime.isBefore(newValue)) {
                    setEndTime(newValue.add(1, 'day'));
                  }
                }}
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

            <div className='flex flex-col gap-2 h-fit'>
              <label className='text-xl sm:text-2xl'>Data de saída</label>
              <DatePicker
                value={endTime}
                onChange={newValue => setEndTime(dayjs(newValue))}
                minDate={startTime}
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
          <h3 className='text-xl sm:text-2xl my-4 sm:m-0 sm:mb-2'>Horarios disponiveis</h3>
          <div className='flex md:flex-row flex-wrap gap-4'>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                className={`w-full max-w-32 flex gap-2 items-center justify-center bg-gray-200 p-2 rounded-md cursor-pointer ${selectedStartTime === index ? 'bg-green-300 text-white' : ''} ${selectedEndTime === index ? 'bg-red-500 text-white' : ''}`}
                onClick={() => handleTimeSelect(index)}
              >
                <Clock size={15} />
                <p className='text-xl sm:text-2xl flex'>{time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button type='submit' colorType='main' className=' w-full font-semibold' value='Reservar' />
    </form>
  );
}
