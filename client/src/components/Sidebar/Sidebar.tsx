import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import { MoonLoader } from 'react-spinners';

export const Sidebar = () => {
  const { sidebarClassName, currentUser } = useContext(Context);

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

  return (
    <>
      <aside id="separator-sidebar" className={sidebarClassName}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2">
            {isLoading ? (
              <MoonLoader size={30} color="white" />
            ) : (
              lists?.map((list) => {
                return <li key={list._id}>{list.name}</li>;
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
