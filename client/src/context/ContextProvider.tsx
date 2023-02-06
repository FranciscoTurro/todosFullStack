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

  const openSidebar: string =
    'fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0';

  const closedSidebar: string =
    'fixed left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 transform-none';

  const [sidebarClassName, setSidebarClassName] = useState(openSidebar);

  const handleSidebarToggle = () => {
    if (sidebarClassName === openSidebar) setSidebarClassName(closedSidebar);
    if (sidebarClassName === closedSidebar) setSidebarClassName(openSidebar);
  };

  return (
    <Context.Provider
      value={{
        currentUser,
        setCurrentUser,
        sidebarClassName,
        handleSidebarToggle,
      }}
    >
      {children}
    </Context.Provider>
  );
};
