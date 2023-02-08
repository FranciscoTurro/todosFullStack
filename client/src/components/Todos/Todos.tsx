import { useContext } from 'react';
import { Context } from '../../context/Context';

export const Todos = () => {
  const { currentList } = useContext(Context);
  return <div className="h-content-height p-4 sm:ml-80">{currentList} </div>;
};
