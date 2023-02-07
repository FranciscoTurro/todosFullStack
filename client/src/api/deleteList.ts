import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../context/Context';

export const deleteList = () => {
  const { currentUser, userLists, setUserLists } = useContext(Context);

  const deletion = useMutation({
    mutationFn: (listID: string) => {
      return axios.delete(`http://localhost:4000/api/lists/${listID}`, {
        headers: { Authorization: `Bearer ${currentUser}` },
      });
    },
    onSuccess: (data) => {
      setUserLists(userLists.filter((list) => list._id !== data.data._id));
    },
    onError: (error: any) => {
      console.log(error.response.data.error);
    },
  });

  return deletion;
};
