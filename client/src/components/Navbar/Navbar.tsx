import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import { logoutUser } from '../../api/logoutUser';

export const Navbar = () => {
  const { currentUser, toggleIsSidebarOpen } = useContext(Context);

  const logout = logoutUser();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="h-header-height bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        {currentUser ? (
          <button
            type="button"
            onClick={toggleIsSidebarOpen}
            className="inline-flex items-center mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
        ) : null}
        <a href="https://flowbite.com/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 mr-3 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>
        {currentUser ? (
          <ul className="text-sm flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:font-medium border-0">
            <li>
              <button onClick={handleClick}>Log out</button>
            </li>
          </ul>
        ) : (
          <ul className="text-sm flex flex-col gap-1 p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:font-medium border-0">
            <li>
              <Link to={'/signup'}>Sign up</Link>
            </li>
            <li>
              <Link to={'/login'}>Login</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
