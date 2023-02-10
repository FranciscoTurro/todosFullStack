import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../context/Context';

export const AddTodoButton = () => {
  const { currentListID } = useContext(Context);
  const [isMenu, setIsMenu] = useState(false);
  const menuRef = useRef<HTMLFormElement>(null);

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

  const handleSubmit = () => {};

  const handleClick = () => {
    setIsMenu(true);
  };

  if (isMenu)
    return (
      <form className="w-full" ref={menuRef} onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            id="name"
            className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
      </form>
    );

  return (
    <button
      onClick={handleClick}
      className="h-10 flex gap-4 justify-center w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      Add todo
    </button>
  );
};
