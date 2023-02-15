import icon from '../assets/img/icon2.png';

export const NotLoggedHome = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="container m-auto grid max-w-screen-lg grid-cols-2 items-center">
        <div className="flex flex-col">
          <h1 className="text-4xl">A generic todo list app!</h1>
          <span className="text-md mb-6 text-synth_pink">
            by Francisco Turró
          </span>
          <p className="mb-6 text-xl font-normal">
            Tired of generic todo lists made by students that provide no new
            features? Well, here's one more! With all the functionality that you
            would expect and nothing else. Made with the MERN stack.
          </p>
          <h1>What are you waiting for? Start using it now!</h1>
        </div>

        <img
          width={400}
          height={400}
          className="m-12"
          src={icon}
          alt="Pointless image"
        />
      </div>
    </div>
  );
};
