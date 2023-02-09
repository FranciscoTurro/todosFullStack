import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../context/Context';

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

export const deleteList = () => {
  const { currentUser, currentList, setCurrentList } = useContext(Context);

  const { refetch } = getLists();

  const deletion = useMutation({
    mutationFn: (listID: string) => {
      if (currentList === listID) setCurrentList('');
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

export const getCurrentList = () => {
  const { currentUser, setCurrentListContent, currentList } =
    useContext(Context);

  const list = useQuery({
    queryKey: ['list'],
    queryFn: () => {
      return axios.get(`http://localhost:4000/api/lists/${currentList}`, {
        headers: { Authorization: `Bearer ${currentUser}` },
      });
    },
    onSuccess: (data) => {
      setCurrentListContent(data.data);
    },
    onError: (error: any) => {
      console.log(error.response.data.error);
    },
  });

  return list;
};

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
