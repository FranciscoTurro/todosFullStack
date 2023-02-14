import { useState } from 'react';
import { addTodo } from '../../api/todos';
import { bigCalendarSVG } from '../../assets/svg/svgs';

export const AddTodoButton = () => {
  const [isMenu, setIsMenu] = useState(false);
  const addition = addTodo();

  const emptyTodo = {
    name: '',
    description: '',
    dueDate: '',
  };
  const [todo, setTodo] = useState<any>(emptyTodo);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todo.description === '') delete todo.description;
    if (todo.dueDate === '') delete todo.dueDate;
    addition.mutate(todo);
    setTodo(emptyTodo);
  };

  const handleClick = () => {
    setIsMenu(true);
  };

  if (isMenu)
    return (
      <form className="text-md px-10 w-3/4" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 font-medium">
            Name
          </label>
          <input
            autoComplete="off"
            onChange={(e) =>
              setTodo({
                ...todo,
                name: e.target.value,
              })
            }
            value={todo.name}
            id="name"
            className="w-full border rounded-lg block p-2 bg-custom_gray-700 border-custom_gray-600"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 font-medium">
            Description
          </label>
          <textarea
            onChange={(e) =>
              setTodo({
                ...todo,
                description: e.target.value,
              })
            }
            value={todo.description}
            id="description"
            rows={4}
            className="w-full border rounded-lg block p-2.5 bg-custom_gray-700 border-custom_gray-600"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 font-medium">
            Date due
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {bigCalendarSVG}
            </div>
            <input
              onChange={(e) =>
                setTodo({
                  ...todo,
                  dueDate: e.target.value,
                })
              }
              value={todo.dueDate}
              type="date"
              className="w-full rounded-lg block pl-10 p-2.5 bg-custom_gray-700 border-custom_gray-600"
              placeholder="Select date"
            />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="focus:outline-none w-24 bg-synth_pink hover:bg-pink-900 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              setTodo(emptyTodo);
              setIsMenu(false);
            }}
            className="focus:outline-none w-24 bg-synth_blue   hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Cancel
          </button>
        </div>
      </form>
    );

  return (
    <button
      onClick={handleClick}
      className="focus:ring-synth_blue bg-synth_blue hover:bg-blue-700 px-10 flex gap-4 justify-center w-3/4 py-2.5 m-2 font-medium focus:outline-none rounded-full focus:ring-4"
    >
      Add todo
    </button>
  );
};
