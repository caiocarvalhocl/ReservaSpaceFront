import { BrowserRouter, Routes, Route } from 'react-router';
import { Home } from '../pages/Home';
import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { MyReservation } from '../pages/MyReservation';

export function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/myreservations'
          element={
            <ProtectedRoute>
              <MyReservation />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
