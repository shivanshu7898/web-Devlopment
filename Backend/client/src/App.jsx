import React from "react";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CustomerDashboard from "./pages/dashboard/customerDashboard";
import RiderDashboard from "./pages/dashboard/riderDashboard";
import RestaurantDashboard from "./pages/dashboard/restaurantDashboard";
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
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/rider-dashboard" element={<RiderDashboard />} />
          <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
       
      </BrowserRouter>
    </>
  );
}

export default App;
