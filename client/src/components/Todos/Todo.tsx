import { useState } from 'react';
import { ITodo } from '../../../../server/models/todos';
import { deleteTodo, editTodo } from '../../api/todos';
import {
  arrowDownSVG,
  arrowUpSVG,
  bigCalendarSVG,
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
  const [isDescOpen, setIsDescOpen] = useState(false);

  const emptyTodo = {
    name: 'initialString',
    description: 'initialString',
    dueDate: 'initialString',
  };
  const [editedTodo, setEditedTodo] = useState<any>(emptyTodo);

  const deletion = deleteTodo();
  const edition = editTodo();

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
    if (editedTodo.name === 'initialString') delete editedTodo.name;
    if (editedTodo.description === 'initialString')
      delete editedTodo.description;
    if (editedTodo.dueDate === 'initialString') delete editedTodo.dueDate;
    edition.mutate({ todoID, todo: editedTodo });
    setEditedTodo(emptyTodo);
    setIsEditOpen(false);
  };

  if (isEditOpen)
    return (
      <div
        className={`${
          todo.completed ? 'border-synth_blue' : 'border-synth_pink'
        } border rounded-lg flex-col items-center p-2 m-1 w-3/4 flex justify-between text-xl relative`}
      >
        <h1>Edit todo</h1>
        <form
          className="text-base px-10 w-full"
          onSubmit={(e) => handleEdit(e, todo._id)}
        >
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 font-medium">
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
              value={
                editedTodo.name !== 'initialString'
                  ? editedTodo.name
                  : todo.name
              }
              className="w-full border rounded-lg block p-2.5 bg-custom_gray-700 border-custom_gray-600"
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
              value={
                editedTodo.description !== 'initialString'
                  ? editedTodo.description
                  : todo.description
              }
              id="description"
              rows={4}
              className="w-full border rounded-lg block p-2.5 bg-custom_gray-700 border-custom_gray-600"
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
                value={
                  todo.dueDate === undefined ||
                  editedTodo.dueDate !== 'initialString'
                    ? editedTodo.dueDate
                    : new Date(todo.dueDate).toISOString().substring(0, 10)
                }
                type="date"
                className="cursor-pointer w-full rounded-lg block pl-10 p-2 bg-custom_gray-700"
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
    <div className="mdl:w-3/4 w-full">
      <div
        className={`rounded-lg flex-wrap border-2 p-2 flex justify-between text-xl relative ${
          todo.completed
            ? `line-through border-synth_blue text-gray-500`
            : 'border-synth_pink'
        }`}
      >
        <div className="flex gap-4">
          <input
            checked={todo.completed}
            type="checkbox"
            className="cursor-pointer"
            onChange={(event) => handleCheck(event, todo._id)}
          />
          <div className="flex flex-col gap-1">
            <h1> {todo.name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {todo.dueDate === undefined ? null : (
            <span
              className={`${
                todo.completed
                  ? 'text-synth_blue border-synth_blue'
                  : 'text-synth_pink border-synth_pink'
              } border max-h-7 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded`}
            >
              {smallCalendarSVG}
              {formatDate(todo.dueDate)}
            </span>
          )}
          {todo.description ? (
            <button onClick={() => setIsDescOpen(!isDescOpen)}>
              {isDescOpen ? arrowUpSVG : arrowDownSVG}
            </button>
          ) : null}
          <button onClick={() => setIsEditOpen(true)}>{editSVG}</button>
          <button onClick={() => handleDelete(todo._id)}>{deleteSVG}</button>
        </div>
      </div>
      <div className="px-3">
        {isDescOpen ? (
          <div
            className={`${
              todo.completed ? 'border-synth_blue' : 'border-synth_pink'
            } text-xl w-full h-48 border-r-2 border-l-2 border-b-2 rounded-lg p-1`}
          >
            {todo.description}
          </div>
        ) : null}
      </div>
    </div>
  );
};
