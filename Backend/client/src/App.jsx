import React from "react";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SendRegisterOTP from "./pages/SendRegisterOTP";
import Home from "./pages/Home";
import CustomerDashboard from "./pages/dashboard/customerDashboard";
import RiderDashboard from "./pages/dashboard/riderDashboard";
import RestaurantDashboard from "./pages/dashboard/restaurantDashboard";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import VerifyRegisterOtp from "./components/PasswordChangeModal/VerifyRegisterOtp";



function App() {
  return (
    <>

      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/customer-dashboard" element={
          <ProtectedRoute allowedRole="customer" >
            <CustomerDashboard />
          </ProtectedRoute>} />
        <Route path="/rider-dashboard" element={
          <ProtectedRoute allowedRole="rider">
            <RiderDashboard />
          </ProtectedRoute>} />
        <Route path="/restaurant-dashboard" element={
          <ProtectedRoute allowedRole="restaurant">
            <RestaurantDashboard />
          </ProtectedRoute>} />
        <Route path="/send-register-otp" element={<SendRegisterOTP />} />
        <Route
          path="/verify-register-otp"
          element={<VerifyRegisterOtp />}
        />

      </Routes>


    </>
  );
}

export default App;
