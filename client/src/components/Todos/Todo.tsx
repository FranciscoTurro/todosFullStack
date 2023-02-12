import { useState } from 'react';
import { ITodo } from '../../../../server/models/todos';
import { deleteTodo, editTodo } from '../../api/todos';
import {
  bigCalendarSVG,
  crossSVG,
  deleteSVG,
  editSVG,
  smallCalendarSVG,
} from '../../assets/svg/svgs';
import { formatDate } from '../../utils/formatDate';

interface TodoProps {
  todo: ITodo;
}

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const emptyTodo = {
    name: '',
    description: '',
    dueDate: '',
  };
  const [editedTodo, setEditedTodo] = useState<any>(emptyTodo);

  const deletion = deleteTodo();
  const edition = editTodo();

  const handleDateChange = (): string => {
    if (todo.dueDate === undefined || editedTodo.dueDate !== '')
      return editedTodo.dueDate;
    else return new Date(todo.dueDate).toISOString().substring(0, 10);
  };

  const handleDateDeletion = (todoID: string) => {};

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    todoID: string
  ) => {
    const todo = { completed: event.target.checked };
    edition.mutate({ todoID, todo });
  };

  const handleDelete = (todoID: string) => {
    deletion.mutate(todoID);
  };

  const handleEdit = (
    event: React.FormEvent<HTMLFormElement>,
    todoID: string
  ) => {
    event.preventDefault();
    if (editedTodo.name === '') delete editedTodo.name;
    if (editedTodo.description === '') delete editedTodo.description;
    if (editedTodo.dueDate === todo.dueDate || editedTodo.dueDate === '')
      delete editedTodo.dueDate;
    edition.mutate({ todoID, todo: editedTodo });
    setEditedTodo(emptyTodo);
    setIsEditOpen(false);
  };

  if (isEditOpen)
    return (
      <div className="flex-col items-center bg-gray-600 p-2 w-3/4 flex justify-between text-xl relative">
        <h1>Edit todo</h1>
        <form
          className="text-md px-10 w-3/4"
          onSubmit={(e) => handleEdit(e, todo._id)}
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              autoComplete="off"
              onChange={(e) =>
                setEditedTodo({
                  ...editedTodo,
                  name: e.target.value,
                })
              }
              value={editedTodo.name}
              id="name"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              onChange={(e) =>
                setEditedTodo({
                  ...editedTodo,
                  description: e.target.value,
                })
              }
              value={editedTodo.description}
              id="description"
              rows={4}
              className="w-full block p-2.5  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 font-medium text-gray-900 dark:text-white"
            >
              Date due
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {bigCalendarSVG}
              </div>
              <input
                onChange={(e) => {
                  setEditedTodo({
                    ...editedTodo,
                    dueDate: e.target.value,
                  });
                }}
                value={handleDateChange()}
                type="date"
                className="cursor-pointer w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
              />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="focus:outline-none text-white bg-green-700 hover:bg-gree-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setEditedTodo(emptyTodo);
                setIsEditOpen(false);
              }}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );

  return (
    <div className="bg-gray-600 p-2 w-3/4 flex justify-between text-xl relative">
      <div className="flex gap-4 ">
        <input
          checked={todo.completed}
          type="checkbox"
          className="cursor-pointer"
          onChange={(event) => handleCheck(event, todo._id)}
        />
        {todo.name}
      </div>
      <div className="flex items-center gap-6">
        {todo.dueDate === undefined ? null : (
          <span className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300">
            {smallCalendarSVG}
            {formatDate(todo.dueDate)}
            <button
              onClick={() => handleDateDeletion(todo._id)}
              className="inline-flex items-center p-0.5 ml-2 text-sm text-blue-400 bg-transparent rounded-sm"
            >
              {crossSVG}
            </button>
          </span>
        )}
        <button onClick={() => setIsEditOpen(true)}>{editSVG}</button>
        <button onClick={() => handleDelete(todo._id)}>{deleteSVG}</button>
      </div>
    </div>
  );
};
