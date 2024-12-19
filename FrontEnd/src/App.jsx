import React, {useState} from 'react';
import './App.css';
import Home from './Pages/Home';
import NoPage from './Pages/NoPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Editors from './Pages/Editor';

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/editor/:projectID' element={isLoggedIn ? <Editors /> : <Navigate to="/login" />} />
          <Route path='*' element={isLoggedIn ? <NoPage /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
