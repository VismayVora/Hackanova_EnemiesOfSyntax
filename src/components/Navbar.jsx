import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

export const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="w-full flex px-36 py-4 justify-between items-center bg-white">
      <div className="flex items-center gap-2">
        <img className="w-8" src={logo} alt="" />
        <h1 className="text-2xl font-bold underline decoration-blue-500">
          Travel.
        </h1>
      </div>
      <div className="flex gap-10 items-center">
        {(!user || user?.is_user) && (
          <>
            <Link
              to="/"
              className="text-gray-400 font-semibold hover:text-cyan-600"
            >
              Home
            </Link>
            <Link to='/search'>
              <h1 className="text-gray-400 font-semibold hover:text-cyan-600">
                Places
              </h1>
            </Link>
            {user ? (
              <button onClick={() => logout()} className="text-white uppercase rounded-full px-6 py-2 bg-red-500">
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="text-white uppercase rounded-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600">
                  Login
                </button>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};
