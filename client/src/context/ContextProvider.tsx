import { useEffect, useState } from 'react';
import { Context } from './Context';
import { IList } from '../../../server/models/lists';

interface Props {
  children: React.ReactNode;
}

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [currentUserID, setCurrentUserID] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('currentUserID');
    if (user) setCurrentUserID(user);
  }, []);

  const [currentListID, setCurrentListID] = useState('');

  const [currentList, setCurrentList] = useState<any>({});

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleIsSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [userLists, setUserLists] = useState<IList[]>([]);

  return (
    <Context.Provider
      value={{
        currentUserID,
        setCurrentUserID,
        isSidebarOpen,
        toggleIsSidebarOpen,
        userLists,
        setUserLists,
        currentListID,
        setCurrentListID,
        currentList,
        setCurrentList,
      }}
    >
      {children}
    </Context.Provider>
  );
};
