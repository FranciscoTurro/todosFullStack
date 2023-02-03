import { useEffect, useState } from 'react';
import { Context } from './Context';

interface Props {
  children: React.ReactNode;
}

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) setCurrentUser(user);
  }, []);

  return (
    <Context.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </Context.Provider>
  );
};
