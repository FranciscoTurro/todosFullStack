import { createContext } from 'react';

interface ContextValueInterface {
  currentUser: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
}

export const Context = createContext<ContextValueInterface>({
  currentUser: '',
  setCurrentUser: () => {},
});
