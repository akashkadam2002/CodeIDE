import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import { MdLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Icons for menu toggle

const Navbar = ({ isGridLayout, setIsGridLayout }) => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For mobile menu toggle

  useEffect(() => {
    fetch("http://127.0.0.1:5000/getUserDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.user);
        } else {
          setError(data.message);
        }
      });
  }, []);

  const Logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <>
      <div className="navbar flex items-center justify-between px-[20px] sm:px-[100px] h-[80px] bg-[#141414]">
        {/* Logo */}
        <div className="logo">
          <img
            className="w-[150px] h-[80px] cursor-pointer"
            src={logo}
            alt="Logo"
          />
        </div>

        {/* Desktop Links */}
        <div className="links hidden sm:flex items-center gap-2">
          <Link>Home</Link>
          <Link>About</Link>
          <Link>Contact</Link>
          <Link>Services</Link>
          <button
            onClick={Logout}
            className="bg-[#92a0c5] p-2 text-white min-w-[120px] ml-2 hover:bg-[#7b89b1] shadow-md rounded-lg transition duration-300 ease-in-out"
          >
            Logout
          </button>
          <Avatar
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            name={data ? data.user : ""}
            size="40"
            round="50%"
            className="cursor-pointer ml-2"
          />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {isDropdownOpen ? (
              <AiOutlineClose size={30} className="text-white" />
            ) : (
              <AiOutlineMenu size={30} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Dropdown Menu (Mobile Only) */}
      {isDropdownOpen && (
        <div className="sm:hidden flex flex-col items-start bg-[#1A1919] px-4 py-2 space-y-2">
          <Link className="text-white">Home</Link>
          <Link className="text-white">About</Link>
          <Link className="text-white">Contact</Link>
          <Link className="text-white">Services</Link>
          <button
            onClick={Logout}
            className="bg-[#92a0c5] text-white w-full hover:bg-[#7b89b1] shadow-md rounded-lg transition duration-300 ease-in-out py-2"
          >
            Logout
          </button>
          <div className="flex items-center gap-2">
            <MdLightMode className="text-[20px] text-white" />
            <span className="text-white">Light mode</span>
          </div>
          <div
            onClick={() => setIsGridLayout(!isGridLayout)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <BsGridFill className="text-[20px] text-white" />
            <span className="text-white">
              {isGridLayout ? "List" : "Grid"} Layout
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
