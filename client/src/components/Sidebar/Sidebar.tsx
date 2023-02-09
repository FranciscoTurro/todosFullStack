import { useContext } from 'react';
import { Context } from '../../context/Context';
import { BarLoader } from 'react-spinners';
import { OptionsButton } from './OptionsButton';
import { getLists } from '../../api/lists';
import { AddListButton } from './AddListButton';

const folderSVG = (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
    />
  </svg>
);

export const Sidebar = () => {
  const { isSidebarOpen, userLists, setCurrentList, currentList } =
    useContext(Context);

  const { isLoading } = getLists();

  return (
    <>
      <aside
        id="separator-sidebar"
        className={`fixed left-0 z-40 w-80 h-full transition-transform ${
          isSidebarOpen
            ? 'sm:translate-x-0 transform-none'
            : '-translate-x-full sm:translate-x-0'
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-4 text-center">
            <AddListButton />
            {isLoading ? (
              <BarLoader color="white" />
            ) : (
              userLists?.map((list) => (
                <li
                  className={`relative flex justify-between hover:bg-gray-700 p-1 rounded-lg ${
                    list._id === currentList
                      ? 'bg-red-500 hover:bg-red-500'
                      : null
                  }`}
                  key={list._id}
                >
                  <button
                    onClick={() => setCurrentList(list._id)}
                    className="w-full flex items-center gap-3 cursor-pointer"
                  >
                    {folderSVG}
                    <h1 className="text-lg">{list.name}</h1>
                  </button>
                  <OptionsButton listID={list._id} />
                </li>
              ))
            )}
          </ul>
          <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>test 1</li>
            <li>test 1</li>
          </ul>
        </div>
      </aside>
    </>
  );
};
