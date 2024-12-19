import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ListCard from "../components/ListCard";
import GridCard from "../components/GridCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [createModelShow, setCreateModelShow] = useState(false);
  const [ProjectTitle, setProjectTitle] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data
    ? data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const createProject = () => {
    if (ProjectTitle === "") {
      alert("Enter project title");
    } else {
      fetch("http://127.0.0.1:5000/createProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: ProjectTitle,
          userId: localStorage.getItem("userId"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCreateModelShow(false);
            setProjectTitle("");
            alert("Project created successfully");
            navigate(`/editor/${data.projectId}`);
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  const getProject = () => {
    fetch("http://127.0.0.1:5000/getProjects", {
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
          setData(data.projects);
        } else {
          setError(data.message);
        }
      });
  };

  useEffect(() => {
    getProject();
  }, []);

  const [userData, setUserData] = useState(null);

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
          setUserData(data.user);
        } else {
          setError(data.message);
        }
      });
  }, []);

  const [isGridLayout, setIsGridLayout] = useState(false);

  return (
    <>
      <Navbar isGridLayout={isGridLayout} setIsGridLayout={setIsGridLayout} />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-[100px] my-[40px] gap-4">
  <h2 className="text-2xl">Hi, {userData ? userData.username.toUpperCase() : ""} 👋</h2>
  <div className="flex items-center gap-2 w-full sm:w-auto">
    <div className="input_box flex-grow">
      <input
        type="text"
        placeholder="Search here... !"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        className="w-full sm:w-auto"
      />
    </div>
    <button
      onClick={() => {
        setCreateModelShow(true);
      }}
      className="btn rounded-[5px] text-lg !p-2 !px-4 mb-5"
    >
      +
    </button>
  </div>
</div>
      

      <div className="cards">
        {isGridLayout ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-8 md:px-[100px]">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <GridCard key={index} item={item} />
              ))
            ) : (
              <p>No projects found</p>
            )}
          </div>
        ) : (
          <div className="list px-4 sm:px-8 md:px-[100px]">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <ListCard key={index} item={item} />
              ))
            ) : (
              <p>No projects found</p>
            )}
          </div>
        )}
      </div>

      {createModelShow && (
        <div className="fixed inset-0 w-screen h-screen bg-black/50 flex items-center justify-center">
          <div className="createModel w-[90vw] md:w-[25vw] h-[40vh] md:h-[32vh] shadow-lg bg-[#141414] rounded-[10px] p-4 md:p-[20px]">
            <h3 className="text-lg md:text-2xl">Create New Project</h3>

            <div className="input_box bg-[#202020] mt-4">
              <input
                onChange={(e) => setProjectTitle(e.target.value)}
                value={ProjectTitle}
                type="text"
                placeholder="Project Title"
                className="w-full"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full mt-4">
              <button
                onClick={createProject}
                className="btn rounded-[5px] w-full md:w-[45%] !p-2"
              >
                Create
              </button>
              <button
                onClick={() => setCreateModelShow(false)}
                className="btn bg-gray-800 rounded-[5px] w-full md:w-[45%] !p-2"
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

export default Home;
