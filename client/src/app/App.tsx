import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/AuthPage/Login";
import Reg from "../pages/AuthPage/Reg";
import Home from "../pages/Home/Home";
import './app.style.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/reg" element={<Reg />} />
      <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
