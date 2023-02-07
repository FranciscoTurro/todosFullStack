import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../context/Context';

export const getLists = () => {
  const { currentUser, setUserLists } = useContext(Context);

  const lists = useQuery({
    queryKey: ['lists'],
    queryFn: () => {
      return axios.get('http://localhost:4000/api/lists/', {
        headers: { Authorization: `Bearer ${currentUser}` },
      });
    },
    onSuccess: (data) => {
      setUserLists(data.data);
    },
    onError: (error: any) => {
      console.log(error.response.data.error);
    },
  });

  return lists;
};
