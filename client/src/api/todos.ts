import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../context/Context';
import { getCurrentList } from './lists';

export const addTodo = () => {
  const { currentUserID, currentListID } = useContext(Context);
  const { refetch } = getCurrentList();

  const addition = useMutation({
    mutationFn: (todo: any) => {
      return axios.post(
        `http://localhost:4000/api/todos/${currentListID}`,
        {
          name: todo.name,
          description: todo.description,
          dueDate: todo.dueDate,
          completed: todo.completed,
          list: currentListID,
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
