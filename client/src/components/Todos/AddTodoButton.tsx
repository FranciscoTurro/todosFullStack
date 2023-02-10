import { useEffect, useRef, useState } from 'react';
import { addTodo } from '../../api/todos';

export const AddTodoButton = () => {
  const [isMenu, setIsMenu] = useState(false);
  const menuRef = useRef<HTMLFormElement>(null);
  const addition = addTodo();

  const emptyTodo = {
    name: '',
    description: '',
    dueDate: null,
  };
  const [todo, setTodo] = useState<any>(emptyTodo);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (menuRef.current === null) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addition.mutate(todo);
    setTodo(emptyTodo);
  };

  const handleClick = () => {
    setIsMenu(true);
  };

  if (isMenu)
    return (
      <form
        className="text-md px-10 w-full"
        ref={menuRef}
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
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
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              onChange={(e) =>
                setTodo({
                  ...todo,
                  dueDate: e.target.value,
                })
              }
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
    );

  return (
    <button
      onClick={handleClick}
      className="px-10 flex gap-4 justify-center w-full py-2.5 mr-2 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      Add todo
    </button>
  );
};
