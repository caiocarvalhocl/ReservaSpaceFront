import { BrowserRouter, Routes, Route } from 'react-router';
import { Home } from '../pages/Home';
import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { MyReservation } from '../pages/MyReservation';
import { MySpaces } from '../pages/MySpaces';
import { SystemUsers } from '../pages/SystemUsers';

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
            <ProtectedRoute minRole='regular'>
              <MyReservation />
            </ProtectedRoute>
          }
        />
        <Route
          path='/myspaces'
          element={
            <ProtectedRoute minRole='manager'>
              <MySpaces />
            </ProtectedRoute>
          }
        />

        <Route
          path='/users'
          element={
            <ProtectedRoute minRole='admin'>
              <SystemUsers />
            </ProtectedRoute>
          }
        />

        <Route path='/unauthorized' element={<></>} />
        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
