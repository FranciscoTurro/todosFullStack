import { createContext } from 'react';

interface ContextValueInterface {
  currentUser: string;
}

export const Context = createContext<ContextValueInterface>({
  currentUser: '',
});
