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

  if (login.isLoading)
    return (
      <div className="w-full flex justify-center items-center h-1/2">
        <CircleLoader color="blue" />
      </div>
    );

  return (
    <div className="m-6 flex flex-col items-center gap-6">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight mdl:text-5xl lg:text-6xl">
        Login
      </h1>
      <form autoComplete="off" className="w-1/2" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="userName" className="block mb-2 text-sm font-medium">
            Username
          </label>
          <input
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            value={user.username}
            type="text"
            id="userName"
            className="bg-custom_gray-700 rounded-lg block p-2.5 w-full"
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
            className="w-full bg-custom_gray-700 rounded-lg block p-2.5"
            required
          />
        </div>
        <div className="text-center text-xl">
          {error ? <p className="text-synth_blue">{error}</p> : null}
        </div>
        <button
          type="submit"
          className="focus:ring-synth_pink bg-synth_pink hover:bg-pink-900 w-full py-2.5 font-medium focus:outline-none rounded-full focus:ring-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};
