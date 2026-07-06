import React from "react";
import { Link } from "react-router-dom";
import CravingLogo from "../assets/CravingsLogo.png"


function Navbar() {
  return (
    <>
     <div className="flex justify-between px-10 bg-(--color-primary)">
      <Link to='/'><img src={CravingLogo} alt="" className="w-25" /></Link>
      <button className="flex gap-1.5  align-middle py-3 text-lg text-amber-50   ">
       
       
        <Link to="/Login" className=" px-2.5 py-1 rounded hover:border">Login</Link>
        <Link to="/Register" className="border px-2.5 py-1 rounded hover:bg-(--color-primary)  text-amber-50">Register</Link>
      </button>
     </div>
    </>
  );
}

export default Navbar;
