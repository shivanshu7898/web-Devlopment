import React from "react";
import foodTable from "../assets/foodTable.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {

  const[formData,setFormData] = useState({
    fullName:"",
    Email:"",
    number:"",
    password:"",
    confirmPassword:"",

  });

  const handleChange =(e)=>{
    setFormData({
      ...formData,[e.target.name]:e.target.value,
    });
  };
  const handleSubmit =(e)=>{
    e.preventDefault()

    console.log("prevent");
    
    const payload={
      ...formData,
    };
    console.log(payload);
    
  };


  return (
    <>
      <div id="foodTable">
       <div className="flex justify-end p-10">
         <div className="bg-amber-50 backdrop-opacity-0 w-100 p-4 flex flex-col gap-6 rounded-2xl shadow-2xl">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-(--color-primary)">Create Account</h1>
            <p className="opacity-60">Join us as a Customer, Restaurant, or Rider</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
            <input
            
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your full Name"
              className="border  p-2 fo"
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="Email"
              id="Email"
              placeholder="Enter your Email"
              className="border p-2"
               value={formData.Email}
              onChange={handleChange} 
            />
            <input
              type="number"
              name="number"
              id="number"
              placeholder="Enter your number"
              className="border p-2"
               value={formData.number}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="border p-2"
               value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Enter your confirmPassword"
              className="border p-2"
               value={formData.confirmPassword}
              onChange={handleChange}
            />
            <div className="flex">
              <input
                type="checkbox"
                name="conditionCheckBox"
                id="conditionCheckBox"
              />
              <p>I agree to the term and conditions.</p>
            </div>
            <div>
              <button
                type="submit"
                className=" w-full p-2.5 rounded bg-(--color-primary) text-white hover:opacity-90"
              >
                Register
              </button>
              <h1 className="text-center mt-1">
                Already Registered?
                <Link
                  to="/Login"
                  className="text-(--color-primary) hover:underline"
                >
                  Login here
                </Link>
              </h1>
            </div>
          </form>
        </div>
       </div>
      </div>
    </>
  );
};

export default Register;
