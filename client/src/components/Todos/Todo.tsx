import { ITodo } from '../../../../server/models/todos';
import { deleteTodo, editTodo } from '../../api/todos';
import { deleteSVG } from '../../assets/svg/svgs';

interface TodoProps {
  todo: ITodo;
}

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  const deletion = deleteTodo();
  const edit = editTodo();

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    todoID: string
  ) => {
    const todo = { completed: event.target.checked };
    edit.mutate({ todoID, todo });
  };

  const handleDelete = (todoID: string) => {
    deletion.mutate(todoID);
  };

  return (
    <div className="bg-pink-900 w-full flex justify-between text-xl">
      <div className="flex gap-4 ">
        <input
          checked={todo.completed}
          type="checkbox"
          className="cursor-pointer"
          onChange={(event) => handleCheck(event, todo._id)}
        />
        {todo.name}
      </div>
      <button onClick={() => handleDelete(todo._id)}>{deleteSVG}</button>
    </div>
  );
};
