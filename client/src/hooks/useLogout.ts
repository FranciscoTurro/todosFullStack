import { useContext } from 'react';
import { Context } from '../context/Context';

export const useLogout = () => {
  const { setCurrentUser } = useContext(Context);

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser('');
    console.log('LOGGED OUT');
  };

  return logout;
};
