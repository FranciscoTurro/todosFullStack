import { useEffect, useRef, useState } from 'react';
import { addList } from '../../api/lists';

export const AddListButton = () => {
  const [isInput, setIsInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addition = addList();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addition.mutate(inputValue);
    setIsInput(false);
    setInputValue('');
  };

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (inputRef.current === null) return;
      if (!inputRef.current.contains(event.target as Node)) {
        setIsInput(false);
        setInputValue('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  if (isInput)
    return (
      <form onSubmit={handleSubmit}>
        <input
          placeholder="New list name"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="text-black h-10 rounded-full py-2.5 px-5  w-full"
          type="text"
        />
      </form>
    );

  return (
    <button
      onClick={() => setIsInput(true)}
      className="h-10 flex gap-4 justify-center w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      Add a list
    </button>
  );
};
