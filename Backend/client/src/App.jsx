import React from "react";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
       
      </BrowserRouter>
    </>
  );
}

export default App;
