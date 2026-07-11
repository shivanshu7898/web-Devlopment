import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../config/connect.js'


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    password: "",
  });
  const [errors , setErrors] = useState({});

  const validation = (formData)=>{

    const newErrors= {};
    if(!formData.Email.trim()){
      newErrors.Email ="Email Required;"
    }
    if(!formData.password.trim()){
      newErrors.password ="Password Required;"
    }
    return newErrors;
  }
   const handleChange = (e) => {
      setFormData({
        ...formData, [e.target.name]: e.target.value,
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
       setErrors({});
     
      const validationErrors = validation(formData);
  
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      try {
        const res = await api.post("/auth/login", formData);
       alert(res.data.message);
       navigate("/User-Dashboard")
      } catch (error) {
        alert(error.response.data.message);
      }
    };






  return (
    <>
      <div id="foodTable">
        <div className="flex  p-10 py-20">
          <div className="bg-amber-50 w-100 p-4 flex flex-col gap-6 rounded-2xl shadow-2xl">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-(--color-primary)">Welcome Back</h1>
              <p className="opacity-60">Login to your Cravings account</p>
            </div>
            <form  onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label htmlFor="Email">Enter your Email</label>
              <input

                type="email"
                name="Email"
                id="Email"
                onChange={handleChange}
                placeholder="Enter your Email"
                className="border p-2  "
              />
              
              <label htmlFor="password">Enter your password</label>
              <input
                type="password"
                name="password"
                id="password"
                 onChange={handleChange}
                placeholder="Enter your password"
                className="border p-2"
              />


              <div className="flex justify-between">
                <div className='flex jus'><input
                  type="checkbox"
                  name="remember"
                  id="remember"
                />
                  <p className='px-1'>Remember me</p></div>
                <div>
                  <h1>
                    forgot Password?
                  </h1>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className=" w-full p-2.5 rounded bg-(--color-primary) text-white hover:opacity-90"
                >
                  Login
                </button>
                <h1 className="text-center mt-1">
                  Do you have account?
                  <Link
                    to="/Register"
                    className="text-(--color-primary) hover:underline"
                  >
                    Create an account
                  </Link>
                </h1>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
};

export default Login