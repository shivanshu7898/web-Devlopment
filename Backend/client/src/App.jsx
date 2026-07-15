import React from "react";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CustomerDashboard from "./pages/dashboard/customerDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Toaster} from "react-hot-toast"


function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster />
      <Navbar />
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Customer-Dashboard" element={<CustomerDashboard />} />
          <Route path="/Register" element={<Register />} />
          
        </Routes>
       
      </BrowserRouter>
    </>
  );
}

export default App;
