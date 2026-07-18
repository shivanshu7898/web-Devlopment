import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CravingLogo from "../assets/CravingsLogo.png";
import { MdOutlineLogout } from "react-icons/md";
import api from "../config/connect.js";
import toast from 'react-hot-toast';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  const getProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      setUser(res.data.data);
      console.log(res);
    } catch (error) {
      setUser(null);
    }
     
  };

  const handleLogout = async () => {
  try {
    await api.post("/auth/logout");
    setUser(null);
    toast.success("Logout Successfully");
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    getProfile();
  }, []);
  
  
  
  return (
    <div className="flex justify-between px-1 bg-(--color-primary)">
      <Link to="/">
        <img src={CravingLogo} alt="Cravings Logo" className="w-25" />
      </Link>

      {user ? (
        
        <div className="flex items-center">
          <Link
            to={
              user?.userType === "restaurant"
                ? "/restaurant-dashboard"
                : user?.userType === "rider"
                ? "/rider-dashboard"
                : "/customer-dashboard"
            }
            className="px-2.5 py-1 rounded text-amber-50 hover:border"
          >
            <img
              src={user?.photo?.url}
              alt="Profile"
              className="object-cover rounded-full w-12 h-12"
            />
          </Link>

          <button
            className="px-2.5 rounded hover:bg-(--color-primary)] text-amber-50"
            onClick={handleLogout}
          >
            <MdOutlineLogout
              title="Logout"
              className="text-3xl hover:translate-x-1"
            />
          </button>
        </div>
      ) : (
        <div className="flex gap-1.5 items-center py-3 text-lg text-amber-50">
          <Link to="/login" className="px-2.5 py-1 rounded hover:border">
            Login
          </Link>

          <Link
            to="/register"
            className="border px-2.5 py-1 rounded  hover:bg-var(--color-primary) text-amber-50"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;