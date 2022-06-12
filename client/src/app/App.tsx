import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import Reg from "../pages/AuthPage/Reg";
import './app.style.css'

const App = () => {
  const { token } = useAppSelector((state) => state.userReducer);

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={!token ? <Navigate to='/reg' /> : null} />
      <Route path="/reg" element={<Reg />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
