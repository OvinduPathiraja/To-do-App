import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/auth/login`,
        data
      );
      localStorage.setItem('jwt', response.data.token);
      console.log("successful "+response);
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        setError(error.response.data.message);
      }
    }
  };


  return (
    <div className="h-screen flex items-center justify-evenly pr-12">
        <div>
        <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className=" max-w-[600px] h-fit object-cover rounded-lg pr-12"
              alt="Sample image"
            />
      </div>
      <div className="flex flex-col items-center pr-28 ">
        <h1 className="text-3xl font-semibold mb-4">Login</h1>
        <form className="flex flex-col pt-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            className="p-2 mb-4 border-2 border-gray-300 rounded-xl min-w-[250px]"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            className="p-2 mb-4 border-2 border-gray-300 rounded-xl"
          />
          <button className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-400">
            Login
          </button>
          <br />
          <p className=" justify-end flex-box">Don't have an account. Click here to <Link to="/signup" className="text-blue-500 mt-4 ">Signup</Link></p>
        </form>
        <p className="text-red-500 mt-4">{error}</p>
      </div>
    </div>
  );
};

export default Auth;
