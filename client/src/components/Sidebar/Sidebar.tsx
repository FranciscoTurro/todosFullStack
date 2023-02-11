import { useContext } from 'react';
import { Context } from '../../context/Context';
import { BarLoader } from 'react-spinners';
import { OptionsButton } from './OptionsButton';
import { getLists } from '../../api/lists';
import { AddListButton } from './AddListButton';
import { folderSVG } from '../../assets/svg/svgs';

export const Sidebar = () => {
  const { isSidebarOpen, userLists, setCurrentListID, currentListID } =
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
                    list._id === currentListID
                      ? 'bg-red-500 hover:bg-red-500'
                      : null
                  }`}
                  key={list._id}
                >
                  <button
                    onClick={() => setCurrentListID(list._id)}
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
