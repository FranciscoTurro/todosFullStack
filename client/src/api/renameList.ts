import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../context/Context';
import { getLists } from './getLists';

export const renameList = (newName: string) => {
  const { currentUser } = useContext(Context);

  const { refetch } = getLists();

  const rename = useMutation({
    mutationFn: (listID: string) => {
      return axios.patch(
        `http://localhost:4000/api/lists/${listID}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${currentUser}` } }
      );
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error: any) => {
      console.log(error.response.data.error);
    },
  });

  return rename;
};
