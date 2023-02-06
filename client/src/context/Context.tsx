import { createContext } from 'react';

interface ContextValueInterface {
  currentUser: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
  sidebarClassName: string;
  handleSidebarToggle: () => void;
}

export const Context = createContext<ContextValueInterface>({
  currentUser: '',
  setCurrentUser: () => {},
  sidebarClassName: '',
  handleSidebarToggle: () => {},
});
