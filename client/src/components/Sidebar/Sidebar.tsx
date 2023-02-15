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
        className={`fixed border-t border-r-2 border-synth_pink left-0 z-40 w-80 h-full transition-transform bg-custom_gray-900 ${
          isSidebarOpen
            ? 'mdl:translate-x-0 transform-none'
            : '-translate-x-full mdl:translate-x-0'
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-4 text-center">
            <AddListButton />
            {isLoading ? (
              <BarLoader color="white" />
            ) : (
              userLists?.map((list) => (
                <li
                  className={`${
                    list._id === currentListID
                      ? 'bg-synth_pink hover:bg-synth_pink'
                      : 'hover:bg-synth_blue'
                  } relative flex justify-between p-2 rounded-lg`}
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
        </div>
      </aside>
    </>
  );
};
