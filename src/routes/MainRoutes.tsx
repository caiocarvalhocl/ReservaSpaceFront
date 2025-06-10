import { BrowserRouter, Routes, Route } from 'react-router';
import { Home } from '../pages/Home';
import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { MyReservation } from '../pages/MyReservation';
import { useUserContext } from '../hooks/useUserContext';

export function MainRoutes() {
  const { state } = useUserContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/myreservations'
          element={
            <ProtectedRoute isLoggedIn={state.isLoggedIn}>
              <MyReservation />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
