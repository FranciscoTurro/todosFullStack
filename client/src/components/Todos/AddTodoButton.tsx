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
      <>
        <h1>Add todo</h1>
        <form className="text-md px-10 w-3/4" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 font-medium text-gray-900 dark:text-white"
            >
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
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 font-medium text-gray-900 dark:text-white"
            >
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
              className="w-full block p-2.5  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 font-medium text-gray-900 dark:text-white"
            >
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
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
              />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="focus:outline-none text-white bg-green-700 hover:bg-gree-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setTodo(emptyTodo);
                setIsMenu(false);
              }}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </>
    );

  return (
    <button
      onClick={handleClick}
      className="px-10 flex gap-4 justify-center w-3/4 py-2.5 m-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      Add todo
    </button>
  );
};
