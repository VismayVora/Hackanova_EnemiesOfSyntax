import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="w-full flex px-36 py-4 justify-between items-center bg-white">
      <div className="flex">
        <h1 className="text-2xl font-bold underline decoration-blue-500">
          Travel.
        </h1>
      </div>
      <div className="flex gap-10 items-center">
        <h1 className="text-gray-400 font-semibold hover:text-cyan-600">
          Home
        </h1>
        <h1 className="text-gray-400 font-semibold hover:text-cyan-600">
          Packages
        </h1>
        <h1 className="text-gray-400 font-semibold hover:text-cyan-600">
          Shop
        </h1>
        <h1 className="text-gray-400 font-semibold hover:text-cyan-600">
          About
        </h1>
        <h1 className="text-gray-400 font-semibold hover:text-cyan-600">
          Pages
        </h1>
        <h1 className="text-gray-400 font-semibold hover:text-cyan-600">
          News
        </h1>
        <h1 className="text-gray-400 font-semibold hover:text-cyan-600">
          Contact
        </h1>
        <Link to="/login">
          <button className="text-white uppercase rounded-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};
