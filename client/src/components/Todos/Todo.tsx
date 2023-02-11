import { ITodo } from '../../../../server/models/todos';
import { deleteTodo, editTodo } from '../../api/todos';
import { deleteSVG, smallCalendarSVG } from '../../assets/svg/svgs';
import { formatDate } from '../../utils/formatDate';

interface TodoProps {
  todo: ITodo;
}

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  const deletion = deleteTodo();
  const edition = editTodo();

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    todoID: string
  ) => {
    const todo = { completed: event.target.checked };
    edition.mutate({ todoID, todo });
  };

  const handleDelete = (todoID: string) => {
    deletion.mutate(todoID);
  };

  return (
    <div className="bg-pink-900 p-2 w-3/4 flex justify-between text-xl relative">
      <div className="flex gap-4 ">
        <input
          checked={todo.completed}
          type="checkbox"
          className="cursor-pointer"
          onChange={(event) => handleCheck(event, todo._id)}
        />
        {todo.name}
      </div>
      <div className="flex items-center gap-6">
        {todo.dueDate === undefined ? null : (
          <span className="max-h-7 bg-blue-100 text-blue-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
            {smallCalendarSVG}
            {formatDate(todo.dueDate)}
          </span>
        )}
        <button onClick={() => handleDelete(todo._id)}>{deleteSVG}</button>
      </div>
    </div>
  );
};
