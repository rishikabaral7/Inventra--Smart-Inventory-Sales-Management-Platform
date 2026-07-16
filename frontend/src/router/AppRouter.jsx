import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Login/>}/>
        <Route path ="/dashboard" element={<Dashboard/>}/>
        <Route path ="*" element={<NotFound/>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
