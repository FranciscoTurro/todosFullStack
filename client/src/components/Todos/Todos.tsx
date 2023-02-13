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

  if (currentListID === '') {
    return (
      <div className="px-10 h-content-height p-4 mdl:ml-80">Select a list</div>
    );
  }

  if (currentList.todos === undefined) return <BarLoader color="red" />;

  return (
    <div className="mdl:px-10 mdl:p-4 flex flex-col items-center h-content-height  mdl:ml-80">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 mdl:text-5xl lg:text-6xl dark:text-white">
        {currentList.name}
      </h1>
      <AddTodoButton />
      <div className="w-full items-center flex flex-col gap-4 mdl:py-5 mdl:px-10">
        {currentList.todos.map((todo: ITodo) => (
          <Todo key={todo._id.toString()} todo={todo} />
        ))}
      </div>
    </div>
  );
};
