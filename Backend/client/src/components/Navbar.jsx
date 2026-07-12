import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CravingLogo from "../assets/CravingsLogo.png";

function Navbar() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between px-1 bg-(--color-primary) ">
        <Link to="/">
          <img src={CravingLogo} alt="Cravings Logo" className="w-25" />
        </Link>
        {user ? (
          <button
            className=" px-2.5  rounded hover:bg-(--color-primary) text-amber-50"
            onClick={() => {
              sessionStorage.removeItem("user");
              navigate("/")
            }}
          >
            Logout
          </button>
        ) : (
          <button className="flex gap-1.5 align-middle py-3 text-lg text-amber-50">
            <Link to="/Login" className="px-2.5 py-1 rounded hover:border">
              Login
            </Link>
            <Link
              to="/Register"
              className="border px-2.5 py-1 rounded hover:bg-(--color-primary) text-amber-50"
            >
              Register
            </Link>
          </button>
        )}
      </div>
    </>
  );
}

export default Navbar;
