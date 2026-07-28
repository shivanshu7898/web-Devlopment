import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/connect.js";
import foodTable from "../assets/foodTable.png";

const SendRegisterOTP = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    Email: "",
    number: "",
    dob: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    userType: "customer",
  });

  const [errors, setErrors] = useState({});

  // ---------------- Validation ----------------

  const validation = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full Name is required";

    if (!formData.Email.trim())
      newErrors.Email = "Email is required";

    if (!formData.number.trim())
      newErrors.number = "Mobile number is required";

    if (!formData.dob)
      newErrors.dob = "Date of birth is required";

    if (!formData.password)
      newErrors.password = "Password is required";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms)
      newErrors.agreeTerms = "Please accept Terms & Conditions";

    return newErrors;
  };

  // ---------------- Input Change ----------------

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ---------------- Send OTP ----------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const validationErrors = validation();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/send-register-otp", {
        fullName: formData.fullName,
        Email: formData.Email,
        number: formData.number,
        dob: formData.dob,
        password: formData.password,
        userType: formData.userType,
      });

      toast.success(res.data.message);

      navigate("/verify-register-otp", {
        state: formData,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="foodTable">
      <div className="flex justify-end p-10">
        <div className="bg-amber-50 w-[420px] p-5 rounded-2xl shadow-2xl">

          <div className="text-center mb-5">
            <h1 className="text-3xl font-semibold text-(--color-primary)">
              Create Account
            </h1>

            <p className="opacity-60">
              Join us as Customer, Restaurant or Rider
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">

            {/* User Type */}

            <div className="flex gap-5">
              {["customer", "restaurant", "rider"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="userType"
                    value={type}
                    checked={formData.userType === type}
                    onChange={handleChange}
                  />

                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="border p-2"
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">{errors.fullName}</span>
            )}

            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={formData.Email}
              onChange={handleChange}
              className="border p-2"
            />
            {errors.Email && (
              <span className="text-red-500 text-sm">{errors.Email}</span>
            )}

            <input
              type="text"
              name="number"
              placeholder="Mobile Number"
              value={formData.number}
              onChange={handleChange}
              className="border p-2"
            />
            {errors.number && (
              <span className="text-red-500 text-sm">{errors.number}</span>
            )}

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="border p-2"
            />
            {errors.dob && (
              <span className="text-red-500 text-sm">{errors.dob}</span>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border p-2"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword}
              </span>
            )}

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              I agree to the Terms & Conditions
            </label>

            {errors.agreeTerms && (
              <span className="text-red-500 text-sm">
                {errors.agreeTerms}
              </span>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 rounded bg-(--color-primary) text-white"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

            <p className="text-center mt-3">
              Already Registered?{" "}
              <Link
                to="/login"
                className="text-(--color-primary) hover:underline"
              >
                Login Here
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SendRegisterOTP;