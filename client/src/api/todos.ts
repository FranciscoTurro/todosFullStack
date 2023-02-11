import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { ITodo } from '../../../server/models/todos';
import { Context } from '../context/Context';
import { getCurrentList } from './lists';

export const addTodo = () => {
  const { currentUserID, currentListID } = useContext(Context);
  const { refetch } = getCurrentList();

  const addition = useMutation({
    mutationFn: (todo: ITodo) => {
      return axios.post(
        `http://localhost:4000/api/todos/${currentListID}`,
        {
          name: todo.name,
          description: todo.description,
          dueDate: todo.dueDate,
          completed: todo.completed,
          list: todo.list,
        },
        {
          headers: { Authorization: `Bearer ${currentUserID}` },
        }
      );
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error: any) => {
      console.log(error.response.data.error);
    },
  });

  return addition;
};

export const deleteTodo = () => {
  const { currentUserID } = useContext(Context);
  const { refetch } = getCurrentList();

  const deletion = useMutation({
    mutationFn: (todoID: string) => {
      return axios.delete(`http://localhost:4000/api/todos/${todoID}`, {
        headers: { Authorization: `Bearer ${currentUserID}` },
      });
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error: any) => {
      console.log(error.response.data.error);
    },
  });

  return deletion;
};

export const editTodo = () => {
  interface MutationArgs {
    todoID: string;
    todo: any;
  }

  const { currentUserID } = useContext(Context);
  const { refetch } = getCurrentList();

  const edition = useMutation({
    mutationFn: ({ todoID, todo }: MutationArgs) => {
      return axios.patch(`http://localhost:4000/api/todos/${todoID}`, todo, {
        headers: { Authorization: `Bearer ${currentUserID}` },
      });
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error: any) => {
      console.log(error.response.data.error);
    },
  });

  return edition;
};
