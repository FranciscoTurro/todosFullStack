import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import { MoonLoader } from 'react-spinners';
import { FolderIcon } from './FolderIcon';
import { OptionsButton } from './OptionsButton';

export const Sidebar = () => {
  const { isSidebarOpen, currentUser } = useContext(Context);

  const [lists, setLists] = useState<any[]>();

  const { isLoading } = useQuery({
    queryKey: ['lists'],
    queryFn: () => {
      return axios.get('http://localhost:4000/api/lists/', {
        headers: { Authorization: `Bearer ${currentUser}` },
      });
    },
    onSuccess: (data) => {
      setLists(data.data);
    },
    onError: (error: any) => {
      console.log(error.response.data.error);
    },
  });

  const handleDelete = (id: string) => {
    //hmm, starting to look messy. abstract these into hooks?
    alert(id);
  };

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
              lists?.map((list) => {
                //context holds the current list to show. clicking on a list
                //changes the context and the folder icon.
                return (
                  <li className="relative flex justify-between" key={list._id}>
                    <div className="flex items-center gap-3">
                      <FolderIcon state="closed" />
                      {list.name}
                    </div>
                    <OptionsButton />
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
