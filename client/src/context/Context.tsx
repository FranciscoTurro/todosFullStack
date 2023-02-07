import { createContext } from 'react';

interface ContextValueInterface {
  currentUser: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
  isSidebarOpen: boolean;
  toggleIsSidebarOpen: () => void;
}

export const Context = createContext<ContextValueInterface>({
  currentUser: '',
  setCurrentUser: () => {},
  isSidebarOpen: false,
  toggleIsSidebarOpen: () => {},
});
