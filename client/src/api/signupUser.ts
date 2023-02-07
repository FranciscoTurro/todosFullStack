import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../context/Context';

interface IUser {
  username: string;
  password: string;
}

export const signupUser = () => {
  const { setCurrentUser } = useContext(Context);

  const [error, setError] = useState();

  const signup = useMutation({
    mutationFn: (user: IUser) => {
      return axios.post('http://localhost:4000/api/users/signup', user);
    },
    onSuccess: (data) => {
      localStorage.setItem('currentUser', data.data);
      setCurrentUser(data.data);
      console.log('SIGNUP WORKED');
    },
    onError: (error: any) => {
      setError(error.response.data.error);
    },
  });

  return { signup, error };
};
