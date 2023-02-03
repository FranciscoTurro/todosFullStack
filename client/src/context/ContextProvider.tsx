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
    if (!user) setCurrentUser('');
  }, []);
  //page needs to update when the currentUser is set. netninja has a video on this problem im pretty sure

  return (
    <Context.Provider value={{ currentUser }}>{children}</Context.Provider>
  );
};
