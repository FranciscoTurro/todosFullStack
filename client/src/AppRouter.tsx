import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Context } from './context/Context';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotLoggedHome } from './pages/NotLoggedHome';
import { Signup } from './pages/Signup';

export const AppRouter = () => {
  const { currentUser } = useContext(Context);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={currentUser ? <Home /> : <NotLoggedHome />} />
        <Route
          path="/signup"
          element={currentUser ? <Navigate to={'/'} /> : <Signup />}
        />
        <Route
          path="/login"
          element={currentUser ? <Navigate to={'/'} /> : <Login />}
        />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </>
  );
};
