import React, { useState } from 'react'
import login from '../assets/videos/login.mp4'
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [show, setShow] = useState(false)
  const loginUser = () => {
    var data = new FormData();
    data.append("email", user.email);
    data.append("password", user.password);

    var config = {
      method: "post",
      url: "http://vismayvora.pythonanywhere.com/account/login/",
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigate('/')
      })
      .catch(function (error) {
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }
  return (
    <div className="h-screen relative overflow-hidden">
      <video autoPlay loop muted className="absolute -z-10 w-screen">
        <source src={login} type="video/mp4" />
      </video>
      <ToastContainer />
      <div className="w-1/2 h-screen bg-gray-100/80 p-24">
        <Link to="/">
          <h1 className="text-2xl font-bold underline decoration-blue-500">
            Travel.
          </h1>
        </Link>
        <h1 className="text-5xl font-semibold mt-12 uppercase">Login</h1>
        <div className="mt-6">
          <h1 className="text-gray-800 font-semibold mb-3">Enter Email</h1>
          <input
            type="text"
            className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
            placeholder="abc@gmail.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="mt-6">
          <h1 className="text-gray-800 font-semibold mb-3">Enter Password</h1>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
              placeholder="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <div className="absolute top-3 right-3">
              <button onClick={() => setShow(!show)}>
                {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={() => loginUser()}
            className="w-full focus:outline-none px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600 text-white rounded-lg text-sm font-semibold"
          >
            Login
          </button>
        </div>
        <h1 className="mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-700">
            Register
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default Login