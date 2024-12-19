import React, { useState } from "react";
import logo from "../images/logo.png";
import { FiDownload } from "react-icons/fi";
import { MdLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const EditorNavbar = () => {

  const navigate = useNavigate();

  const [isLightMode, setIsLightMode] = useState(false);

  const changeTheme = () => {
    const editorNavbar = document.querySelector(".navbar");
    if (isLightMode) {
      editorNavbar.style.background = "#141414";
      setIsLightMode(false);
    } else {
      editorNavbar.style.background = "#f4f4f4";
      setIsLightMode(true);
    }
  };
  return (
    <>
      <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div onClick={() => navigate('/')} className="logo">
          <img className="w-[150px] h-[80px] cursor-pointer" src={logo} alt="" />
          
        </div>
        <p>
          File/ <span className="text-[grey]"> My First Project</span>
        </p>
        <div className="flex items-center gap-4">
          <i
            className="text-[20px] cursor-pointer"
            onClick={changeTheme}
          >
            <MdLightMode />
          </i>
          <i className="p-[8px] btn2 bg-black rounded-[5px] cursor-pointer text-[20px]">
            <FiDownload />
          </i>
        </div>
      </div>
    </>
  );
};

export default EditorNavbar;
