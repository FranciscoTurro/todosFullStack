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

  const [currentList, setCurrentList] = useState('');

  const [currentListContent, setCurrentListContent] = useState<any>();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleIsSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [userLists, setUserLists] = useState<any[]>([]);

  return (
    <Context.Provider
      value={{
        currentUser,
        setCurrentUser,
        isSidebarOpen,
        toggleIsSidebarOpen,
        userLists,
        setUserLists,
        currentList,
        setCurrentList,
        currentListContent,
        setCurrentListContent,
      }}
    >
      {children}
    </Context.Provider>
  );
};
