import { useState } from 'react';
import { CircleLoader } from 'react-spinners';
import { loginUser } from '../api/users';

interface IUser {
  username: string;
  password: string;
}

export const Login = () => {
  const [user, setUser] = useState<IUser>({ username: '', password: '' });

  const { error, login } = loginUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login.mutate(user);
  };

  if (login.isLoading) return <CircleLoader color="red" />;

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      LOGIN
      <div className="mb-6">
        <label htmlFor="userName" className="block mb-2 text-sm font-medium ">
          Username
        </label>
        <input
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          value={user.username}
          type="text"
          id="userName"
          className="text-black bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium">
          Password
        </label>
        <input
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
          type="password"
          id="password"
          className="text-black bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div>
        {error ? <p className="text-red-500">{error}</p> : null}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full mdl:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
