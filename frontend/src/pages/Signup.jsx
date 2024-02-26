import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image2 from "../images/thinking_man.png";
import image from "../images/list2.png";

const Signup = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/auth/signup`,
        data
      );
      localStorage.setItem('jwt', response.data.token);
      console.log(response);
      navigate("/home");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="h-screen flex justify-evenly items-start pt-28 ">
      <div>
        <img src={image2} className=" max-w-[500px] h-fit object-cover rounded-lg" alt="Sample image" />
      </div>
      <div className="flex flex-col items-center pl-12">
        <h1 className="text-3xl font-semibold mb-4">Signup</h1>
        <form className="flex flex-col pt-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="userName"
            onChange={handleChange}
            value={data.userName}
            className="p-2 mb-4 border-2 border-gray-300 rounded-xl min-w-[250px]"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            className="p-2 mb-4 border-2 border-gray-300 rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            className="p-2 mb-4 border-2 border-gray-300 rounded-xl"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button className="p-2 bg-blue-500 text-white rounded-xl" type="submit">
            Signup
          </button>
        </form>
      </div>
      <div>
        <img
          src={image}
          className=" max-w-[500px] h-fit object-cover rounded-lg pl-12"
          alt="Sample image"
        />
      </div>
    </div>
  );
};

export default Signup;
