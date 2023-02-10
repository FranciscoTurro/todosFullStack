import { ITodo } from '../../../../server/models/todos';

interface TodoProps {
  todo: ITodo;
}

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    alert(event.target.checked);
    //capaz me puedo arreglar con editTodo solamente, pero si no podes hacer un toggleTodo, le pasas el ID y le cambia el check
  };

  return (
    <div className="w-full flex gap-4 text-xl">
      <input
        type="checkbox"
        className="cursor-pointer"
        onChange={handleCheck}
      />
      {todo.name}
    </div>
  );
};
