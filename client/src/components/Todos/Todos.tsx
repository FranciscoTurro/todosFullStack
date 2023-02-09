import { useContext } from 'react';
import { Context } from '../../context/Context';

export const Todos = () => {
  const { currentListID } = useContext(Context);

  if (currentListID === '')
    return <div className="h-content-height p-4 sm:ml-80">Select a list</div>;

  return <div className="h-content-height p-4 sm:ml-80">{currentListID}</div>;
};
//getonelist returns a list with all of its todos
