import { useContext } from 'react';
import { Context } from '../../context/Context';

export const Sidebar = () => {
  const { sidebarClassName } = useContext(Context);

  return (
    <>
      <aside id="separator-sidebar" className={sidebarClassName}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2">
            <li>test 1</li>
            <li>test 1</li>
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
