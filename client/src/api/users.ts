import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../context/Context';

interface IUser {
  username: string;
  password: string;
}

export const signupUser = () => {
  const { setCurrentUserID } = useContext(Context);

  const [error, setError] = useState();

  const signup = useMutation({
    mutationFn: (user: IUser) => {
      return axios.post('http://localhost:4000/api/users/signup', user);
    },
    onSuccess: (data) => {
      localStorage.setItem('currentUserID', data.data);
      setCurrentUserID(data.data);
    },
    onError: (error: any) => {
      setError(error.response.data.error);
    },
  });

  return { signup, error };
};

export const logoutUser = () => {
  const { setCurrentUserID, setCurrentListID } = useContext(Context);

  const logout = () => {
    localStorage.removeItem('currentUserID');
    setCurrentUserID('');
    setCurrentListID('');
  };

  return logout;
};

export const loginUser = () => {
  const { setCurrentUserID } = useContext(Context);

  const [error, setError] = useState();

  const login = useMutation({
    mutationFn: (user: IUser) => {
      return axios.post('http://localhost:4000/api/users/login', user);
    },
    onSuccess: (data) => {
      localStorage.setItem('currentUserID', data.data);
      setCurrentUserID(data.data);
    },
    onError: (error: any) => {
      setError(error.response.data.error);
    },
  });

  return { login, error };
};
