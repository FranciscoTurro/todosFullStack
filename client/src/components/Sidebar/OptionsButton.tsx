import { useEffect, useRef, useState } from 'react';

const hiddenMenu: string = 'hidden';
const visibleMenu: string =
  'z-10 absolute left-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600';

export const OptionsButton = () => {
  const [state, setState] = useState(hiddenMenu);
  const menuRef = useRef<any>();

  const handleClick = () => {
    state === hiddenMenu ? setState(visibleMenu) : setState(hiddenMenu);
  };

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (menuRef.current.contains === e.target) console.log(2);
      if (!menuRef.current.contains(e.target)) setState(hiddenMenu);
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <>
      <button
        onClick={handleClick}
        id="dropdownMenuIconButton"
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
        </svg>
      </button>

      <div ref={menuRef} className={state}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
        </ul>
        <div className="py-2">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Separated link
          </a>
        </div>
      </div>
    </>
  );
};
