import { useContext } from 'react';
import { getCurrentList } from '../../api/lists';
import { Context } from '../../context/Context';

export const Todos = () => {
  const { currentList, currentListContent } = useContext(Context);

  const { refetch } = getCurrentList();

  if (currentList === '')
    return <div className="h-content-height p-4 sm:ml-80">Select a list</div>;

  return (
    <div className="h-content-height p-4 sm:ml-80">
      {JSON.stringify(currentListContent)}
    </div>
  );
};
//getonelist returns a list with all of its todos
