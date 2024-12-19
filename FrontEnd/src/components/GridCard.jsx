import React, { useState } from 'react';
import codeImg from '../images/code.png';
import deleteImg from '../images/delete.png';
import { useNavigate } from 'react-router-dom';

const GridCard = ({ item }) => {
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();

  const deleteProject = (id) => {
    fetch("http://127.0.0.1:5000/deleteProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: id,
        userId: localStorage.getItem("userId")
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsDelete(false);
          window.location.reload();
        }
        else {
          alert(data.message);
          setIsDelete(false);
        }
      })
  }

  return (
    <>
      <div className="gridcard bg-[#141414] w-[270px] p-[10px] h-[190px] cursor-pointer hover:bg-[#202020] rounded-lg shadow-lg shadow-black/50">
        <div onClick={() => { navigate(`/editor/${item._id}`) }} >
          <img className='w-[90px]' src={codeImg} alt="" />
          <h3 className='text-[20px] w-[90%] line-clamp-1'>{item.title}</h3>
        </div>
        <div className="felx items-center justify-between">
          <p className='text-[14px] text-[gray]'>Created on {new Date(item.date).toDateString()}</p>
          <img onClick={() => { setIsDelete(true) }} className='w-[30px] mx-[210px] cursor-pointer' src={deleteImg} alt="" />
        </div>
      </div>

      {
        isDelete ? <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex justify-center items-center flex-col">
          <div className="mainModel w-[25vw] h-[25vh] bg-[#141414] rounded-lg p-[20px]">
            <h3 className='text-3xl'>Do you want to delete <br />
              this project</h3>
            <div className='flex w-full mt-5 items-center gap-[10px]'>
              <button onClick={() => { deleteProject(item._id) }} className='p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]'>Delete</button>
              <button onClick={() => { setIsDelete(false) }} className='p-[10px] rounded-lg bg-[#1A1919] text-white cursor-pointer min-w-[49%]'>Cancel</button>
            </div>
          </div>
        </div> : ""
      }
    </>
  );
}

export default GridCard;
