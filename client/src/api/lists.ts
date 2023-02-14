import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../context/Context';

export const addList = () => {
  const { currentUserID } = useContext(Context);

  const { refetch } = getLists();

  const addition = useMutation({
    mutationFn: (name: string) => {
      return axios.post(
        'http://localhost:4000/api/lists/',
        { name },
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

export const deleteList = () => {
  const { currentUserID, currentListID, setCurrentListID } =
    useContext(Context);

  const { refetch } = getLists();

  const deletion = useMutation({
    mutationFn: (listID: string) => {
      if (currentListID === listID) setCurrentListID('');
      return axios.delete(`http://localhost:4000/api/lists/${listID}`, {
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

export const getLists = () => {
  const { currentUserID, setUserLists } = useContext(Context);

  const lists = useQuery({
    queryKey: ['lists'],
    queryFn: () => {
      return axios.get('http://localhost:4000/api/lists/', {
        headers: { Authorization: `Bearer ${currentUserID}` },
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
  const { currentUserID, setCurrentList, currentListID } = useContext(Context);

  const list = useQuery({
    queryKey: ['list', currentListID],
    queryFn: () => {
      return axios.get(`http://localhost:4000/api/lists/${currentListID}`, {
        headers: { Authorization: `Bearer ${currentUserID}` },
      });
    },
    onSuccess: (data) => {
      setCurrentList(data.data);
    },
    onError: (error: any) => {
      console.log(error.response.data.error);
    },
  });

  return list;
};

export const renameList = (newName: string) => {
  const { currentUserID } = useContext(Context);

  const { refetch: refetchLists } = getLists();

  const { refetch: refetchList } = getCurrentList();

  const rename = useMutation({
    mutationFn: (listID: string) => {
      return axios.patch(
        `http://localhost:4000/api/lists/${listID}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${currentUserID}` } }
      );
    },
    onSuccess: () => {
      refetchLists();
      refetchList();
    },
    onError: (error: any) => {
      console.log(error.response.data.error);
    },
  });

  return rename;
};
