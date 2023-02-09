import { useContext } from 'react';
import { BarLoader } from 'react-spinners';
import { getCurrentList } from '../../api/lists';
import { Context } from '../../context/Context';

export const Todos = () => {
  const { currentListID, currentList } = useContext(Context);

  getCurrentList();

  if (currentList.todos === undefined) return <BarLoader color="red" />;

  if (currentListID === '')
    return <div className="h-content-height p-4 sm:ml-80">Select a list</div>;

  return (
    <div className="h-content-height p-4 sm:ml-80">
      {currentList.todos.map((todo: any) => (
        <div key={todo._id.toString()}>{JSON.stringify(todo.name)}</div>
      ))}
    </div>
  );
};
