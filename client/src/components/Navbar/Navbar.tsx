import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import { logoutUser } from '../../api/users';
import { threeBarsSVG } from '../../assets/svg/svgs';
import icon from '../../assets/img/icon.png';

export const Navbar = () => {
  const { currentUserID, toggleIsSidebarOpen } = useContext(Context);

  const logout = logoutUser();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="h-header-height flex justify-center items-center bg-white border-gray-200 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        {currentUserID ? (
          <button
            type="button"
            onClick={toggleIsSidebarOpen}
            className="inline-flex items-center mt-2 ml-3 text-sm text-gray-500 rounded-lg mdl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            {threeBarsSVG}
          </button>
        ) : null}
        <Link to={'/'}>
          <div className="flex gap-2 text-white text-4xl font-bold items-center">
            <img src={icon} alt="" height={40} width={45} />
            全て
          </div>
        </Link>
        {currentUserID ? (
          <ul className="text-sm flex gap-4 p-4 rounded-lg mdl:space-x-8 mdl:mt-0 mdl:font-medium border-0">
            <li>
              <button onClick={handleClick}>Log out</button>
            </li>
          </ul>
        ) : (
          <ul className="text-sm flex gap-4 p-4 rounded-lg mdl:space-x-8 mdl:mt-0 mdl:font-medium border-0">
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
