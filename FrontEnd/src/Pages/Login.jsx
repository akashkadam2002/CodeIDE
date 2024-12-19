import React, { useState } from 'react';
import logo from '../images/logo.png';
import image from '../images/authPageSide.png';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => res.json()).then(data => {
      if (data.success === true) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", data.userId);
        setTimeout(() => {
          window.location.href = "/";
        }, 200);
      } else {
        setError(data.message);
      }
    });
  };

  return (
    <>
      <div className="container w-screen min-h-screen flex flex-col md:flex-row items-center justify-between md:pl-[100px] p-4 md:p-0">
        {/* Left Section */}
        <div className="left w-full md:w-[40%]">
          <div className="flex items-center justify-center md:justify-start h-full" >
            <img className="w-[180px] md:w-[280px] h-[150px]" style={{ marginTop: '20px !important' }} src={logo} alt="Logo" />
          </div>

          <form
            onSubmit={submitForm}
            className="w-full mt-6 md:mt-[60px] flex flex-col items-center md:items-start"
          >
            <div className="input_box w-full md:w-[80%]">
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="input_box w-full md:w-[80%] mt-4">
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <p className="text-[grey] mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#00AEEF]">
                Sign Up
              </Link>
            </p>

            <p className="text-red-500 text-[14px] my-2">{error}</p>

            <button className="btn w-full md:w-[80%] mt-[20px] bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg">
              Login
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="right w-full md:w-[55%] mt-6 md:mt-0">
          <img
            className="h-auto w-full md:h-[100vh] md:w-full object-cover rounded-lg md:rounded-none"
            src={image}
            alt="Auth"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
