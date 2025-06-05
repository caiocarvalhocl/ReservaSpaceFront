import { BrowserRouter, Routes, Route } from 'react-router';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';

export function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
