import { createContext } from 'react';

interface ContextValueInterface {
  currentUser: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
  isSidebarOpen: boolean;
  toggleIsSidebarOpen: () => void;
  userLists: any[];
  setUserLists: React.Dispatch<React.SetStateAction<any[]>>;
  currentList: string;
  setCurrentList: React.Dispatch<React.SetStateAction<string>>;
  currentListContent: any;
  setCurrentListContent: React.Dispatch<React.SetStateAction<any>>;
}

export const Context = createContext<ContextValueInterface>({
  currentUser: '',
  setCurrentUser: () => {},
  isSidebarOpen: false,
  toggleIsSidebarOpen: () => {},
  userLists: [],
  setUserLists: () => {},
  currentList: '',
  setCurrentList: () => {},
  currentListContent: null,
  setCurrentListContent: () => {},
});
