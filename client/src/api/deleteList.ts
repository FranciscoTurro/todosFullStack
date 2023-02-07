import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../context/Context';
import { getLists } from './getLists';

export const deleteList = () => {
  const { currentUser } = useContext(Context);

  const { refetch } = getLists();

  const deletion = useMutation({
    mutationFn: (listID: string) => {
      return axios.delete(`http://localhost:4000/api/lists/${listID}`, {
        headers: { Authorization: `Bearer ${currentUser}` },
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
