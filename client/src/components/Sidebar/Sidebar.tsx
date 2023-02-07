import { useContext } from 'react';
import { Context } from '../../context/Context';
import { MoonLoader } from 'react-spinners';
import { FolderIcon } from './FolderIcon';
import { OptionsButton } from './OptionsButton';
import { getLists } from '../../api/getLists';

export const Sidebar = () => {
  const { isSidebarOpen, userLists } = useContext(Context);

  const { isLoading } = getLists();

  return (
    <>
      <aside
        id="separator-sidebar"
        className={`fixed left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen
            ? 'sm:translate-x-0 transform-none'
            : '-translate-x-full sm:translate-x-0'
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-4 text-center">
            {isLoading ? (
              <MoonLoader size={30} color="white" />
            ) : (
              userLists?.map((list) => {
                //context holds the current list to show. clicking on a list
                //changes the context and the folder icon.
                return (
                  <li className="relative flex justify-between" key={list._id}>
                    <div className="flex items-center gap-3">
                      <FolderIcon state="closed" />
                      {list.name}
                    </div>
                    <OptionsButton listID={list._id} />
                  </li>
                );
              })
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
