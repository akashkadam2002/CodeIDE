import React, { useState } from "react";
import img from "../images/code.png";
import deleteImg from "../images/delete.png";
import { useNavigate } from "react-router-dom";

const ListCard = ({ item, onDeleteSuccess }) => {
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);

  const deleteProject = (id) => {
    fetch("http://127.0.0.1:5000/deleteProject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: id, userId: localStorage.getItem("userId") }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsDelete(false);
          // onDeleteSuccess(id); 
        } else {
          alert(data.message);
          setIsDelete(false);
        }
      })
      .catch((error) => {
        console.error("Delete request failed:", error);
        alert("An error occurred. Please try again.");
        setIsDelete(false);
      });
  };

  return (
    <>
      <div className="listcard mb-2 w-[full] flex items-center justify-between p-[10px] bg-[#141414] cursor-pointer rounded-lg hover:bg-[#202020]">
        <div onClick={() => navigate(`/editor/${item._id}`)} className="flex items-center gap-2">
          <img className="w-[80px]" src={img} alt="" />
          <div>
            <h3 className="text-[20px]">{item.title}</h3>
            <p className="text-[gray] text-[14px]">Created in {new Date(item.date).toDateString()}</p>
          </div>
        </div>
        <div>
          <img
            onClick={() => setIsDelete(true)}
            className="w-[30px] cursor-pointer mr-4"
            src={deleteImg}
            alt=""
          />
        </div>
      </div>

      {isDelete && (
        <div
          role="dialog"
          aria-labelledby="delete-modal-title"
          aria-describedby="delete-modal-desc"
          className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center"
        >
          <div className="mainModel w-[90%] sm:w-[25vw] h-auto bg-[#141414] rounded-lg p-[20px]">
            <h3 id="delete-modal-title" className="text-3xl">
              Do you want to delete this project?
            </h3>
            <div className="flex w-full mt-5 items-center gap-[10px]">
              <button
                onClick={() => deleteProject(item._id)}
                className="p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDelete(false)}
                className="p-[10px] rounded-lg bg-[#1A1919] text-white cursor-pointer min-w-[49%]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListCard;
