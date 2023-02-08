import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../context/Context';
import { getLists } from './getLists';

export const addList = () => {
  const { currentUser } = useContext(Context);

  const { refetch } = getLists();

  const addition = useMutation({
    mutationFn: (name: string) => {
      return axios.post(
        'http://localhost:4000/api/lists/',
        { name },
        {
          headers: { Authorization: `Bearer ${currentUser}` },
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
