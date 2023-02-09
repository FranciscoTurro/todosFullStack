import { createContext } from 'react';
import { IList } from '../../../server/models/lists';

const emptyIList: IList = Object.assign({
  name: '',
  todos: [],
  creator: '',
});

interface ContextValueInterface {
  currentUserID: string;
  setCurrentUserID: React.Dispatch<React.SetStateAction<string>>;
  isSidebarOpen: boolean;
  toggleIsSidebarOpen: () => void;
  userLists: IList[];
  setUserLists: React.Dispatch<React.SetStateAction<IList[]>>;
  currentListID: string;
  setCurrentListID: React.Dispatch<React.SetStateAction<string>>;
  currentList: IList;
  setCurrentList: React.Dispatch<React.SetStateAction<IList>>;
}

export const Context = createContext<ContextValueInterface>({
  currentUserID: '',
  setCurrentUserID: () => {},
  isSidebarOpen: false,
  toggleIsSidebarOpen: () => {},
  userLists: [],
  setUserLists: () => {},
  currentListID: '',
  setCurrentListID: () => {},
  currentList: emptyIList,
  setCurrentList: () => {},
});
