import { useContext } from 'react';
import { BarLoader } from 'react-spinners';
import { getCurrentList } from '../../api/lists';
import { Context } from '../../context/Context';
import { ITodo } from '../../../../server/models/todos';
import { Todo } from './Todo';
import { AddTodoButton } from './AddTodoButton';

export const Todos = () => {
  const { currentListID, currentList } = useContext(Context);

  getCurrentList();

  if (currentList.todos === undefined) return <BarLoader color="red" />;

  if (currentListID === '')
    return <div className="h-content-height p-4 sm:ml-80">Select a list</div>;

  return (
    <div className="flex flex-col items-center h-content-height p-4 sm:ml-80">
      <AddTodoButton />
      {currentList.todos.map((todo: ITodo) => (
        <Todo key={todo._id.toString()} todo={todo} />
      ))}
    </div>
  );
};
