import React, { useState, useRef, useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import { deleteList } from '../../api/deleteList';
import { renameList } from '../../api/renameList';

interface OptionsButtonProps {
  listID: string;
}

export const OptionsButton: React.FC<OptionsButtonProps> = ({ listID }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [newName, setNewName] = useState('');
  const menuRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const deletion = deleteList();
  const rename = renameList(newName);

  const handleDelete = (listID: string) => {
    deletion.mutate(listID);
  };

  const handleNameChange = (listID: string) => {
    rename.mutate(listID);
    setIsInput(false);
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (menuRef.current === null) return;
      if (buttonRef.current?.contains(event.target as Node)) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <>
      <button
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleOpen}
        ref={buttonRef}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
        </svg>
      </button>

      <div
        ref={menuRef}
        className={`z-10 ${
          isOpen ? '' : 'hidden'
        } absolute top-full left-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        {isInput ? (
          <div className="p-4 text-black flex flex-col gap-4 items-center">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-11/12"
            />
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleNameChange(listID)}
                className="bg-green-500 rounded-md w-16"
              >
                Rename
              </button>
              <button
                onClick={() => setIsInput(false)}
                className="bg-red-500 rounded-md w-16"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li className="cursor-pointer block  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <button
                className="px-4 py-2 w-full"
                onClick={() => {
                  setIsInput(true);
                }}
              >
                Change name
              </button>
            </li>
            <li className="cursor-pointer block  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <button
                className="px-4 py-2 w-full"
                onClick={() => handleDelete(listID)}
              >
                {deletion.isLoading ? (
                  <RingLoader color="red" size={20} />
                ) : (
                  'Delete'
                )}
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};
