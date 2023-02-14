import React, { useState, useRef, useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import { deleteList, renameList } from '../../api/lists';
import { threeDotsSVG } from '../../assets/svg/svgs';

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
        setIsInput(false);
        setNewName('');
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
        className="inline-flex items-center p-2 text-sm font-medium text-center rounded-lg"
        onClick={toggleOpen}
        ref={buttonRef}
      >
        {threeDotsSVG}
      </button>

      <div
        ref={menuRef}
        className={`z-10 ${
          isOpen ? '' : 'hidden'
        } absolute top-full left-20 rounded-lg w-48 h-28 bg-custom_gray-700`}
      >
        {isInput ? (
          <div className="p-4 flex flex-col gap-4 items-center">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-custom_gray-600 border border-custom_gray-900 w-11/12 rounded-lg p-1"
            />
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleNameChange(listID)}
                className="focus:outline-none w-16 p-1 bg-synth_pink hover:bg-pink-900 focus:ring-4 font-medium rounded-lg"
              >
                Rename
              </button>
              <button
                onClick={() => setIsInput(false)}
                className="focus:outline-none w-16 p-1 bg-synth_blue   hover:bg-blue-800 focus:ring-4 font-medium rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <ul className="p-2 h-full flex flex-col justify-center items-center">
            <li className="cursor-pointer block w-full hover:bg-synth_blue rounded">
              <button
                className="px-4 py-2 "
                onClick={() => {
                  setIsInput(true);
                }}
              >
                Change list name
              </button>
            </li>
            <li className="cursor-pointer block w-full rounded hover:bg-synth_blue">
              <button
                className="px-4 py-2 "
                onClick={() => handleDelete(listID)}
              >
                {deletion.isLoading ? (
                  <RingLoader color="red" size={20} />
                ) : (
                  'Delete list'
                )}
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};
