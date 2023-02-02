import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../context/Context';

interface IUser {
  username: string;
  password: string;
}

export const Signup = () => {
  const { setCurrentUser } = useContext(Context);

  const [user, setUser] = useState<IUser>({ username: '', password: '' });

  const mutation = useMutation({
    mutationFn: (user: IUser) => {
      return axios.post('http://localhost:4000/api/users/signup', user);
    },
    onSuccess: (data) => {
      setCurrentUser(data.data.token);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(user);
  };

  return mutation.isLoading ? (
    <div>loading</div>
  ) : (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="userName" className="block mb-2 text-sm font-medium ">
          Username
        </label>
        <input
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          type="text"
          id="userName"
          className="text-black bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium">
          Your password
        </label>
        <input
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          id="password"
          className="text-black bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  );
};
