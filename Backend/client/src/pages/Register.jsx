import React from "react";
import foodTable from "../assets/foodTable.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../config/connect.js"

const Register = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    Email: "",
    number: "",
    dob: "",

    password: "",
    confirmPassword: "",
  });


  const [errors, setErrors] = useState({});


  const validation = (formData) => {

    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "FullName Required;"
    }
    if (!formData.Email.trim()) {
      newErrors.Email = "Email Required;"
    }
    if (!formData.number.trim()) {
      newErrors.number = "Number Required;"
    }

    if (!formData.dob.trim()) {
      newErrors.dob = "dob Required;"
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password Required;"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "password do not match"
    }
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";

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
      const res = await api.post("/auth/register", formData);
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <div id="foodTable">
        <div className=" flex justify-end p-10">
          <div className=" bg-amber-50 backdrop-opacity-0 w-100 p-4 flex flex-col gap-6 rounded-2xl shadow-2xl">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-(--color-primary)">Create Account</h1>
              <p className="opacity-60">Join us as a Customer, Restaurant, or Rider</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col  gap-3">
              <input

                type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter your full Name"
                className="border  p-2 fo"
                value={formData.fullName}
                onChange={handleChange}
              />

              {
                errors.fullName && <span className="text-sm pb-3 text-red-500">{errors.fullName}</span>
              }
              <input
                type="email"
                name="Email"
                id="Email"
                placeholder="Enter your Email"
                className="border p-2"
                value={formData.Email}
                onChange={handleChange}
              />

              {
                errors.Email && <span className="text-sm pb-3 text-red-500">{errors.Email}</span>
              }
              <input
                type="number"
                name="number"
                id="number"
                placeholder="Enter your number"
                className="border p-2"
                value={formData.number}
                onChange={handleChange}
              />
              {
                errors.number && <span className="text-sm pb-3 text-red-500">{errors.number}</span>
              }

              <input
                type="date"
                name="dob"
                id="dob"

                className="border p-2"
                value={formData.dob}
                onChange={handleChange}
              />
              {
                errors.dob && <span className="text-sm pb-3 text-red-500">{errors.dob}</span>
              }

              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="border p-2"
                value={formData.password}
                onChange={handleChange}
              />
              {
                errors.password && <span className="text-sm pb-3 text-red-500">{errors.password}</span>
              }
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Enter your confirmPassword"
                className="border p-2"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {
                errors.confirmPassword && <span className="text-sm pb-3 text-red-500">{errors.confirmPassword}</span>
              }
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
