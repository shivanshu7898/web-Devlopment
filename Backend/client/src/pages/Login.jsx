import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/connect";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import foodTable from "../assets/foodTable.png";
import pizza from "../assets/image.png"
import ForgotPasswordModal from "../components/PasswordChangeModal/forgotPassword";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();

  const { isLogin, user, getProfile } = useAuth();
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await api.post("/auth/google-login", {
         credential: credentialResponse.credential,
      });

      console.log(res.data);
      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  };



  const [formData, setFormData] = useState({
    Email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  useEffect(() => {
    if (!isLogin || !user) return;

    if (user.userType === "restaurant") {
      navigate("/restaurant-dashboard");
    } else if (user.userType === "rider") {
      navigate("/rider-dashboard");
    } else if (user.userType === "customer") {
      navigate("/customer-dashboard");
    }
  }, [isLogin, user, navigate]);

  const validation = () => {
    const newErrors = {};

    if (!formData.Email.trim()) {
      newErrors.Email = "Email Required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password Required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validation();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


    setLoading(true);
    console.log("Login submitted:", formData);
    try {


      const res = await api.post("/auth/login", formData);

      toast.success(res.data.message);
      await getProfile();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <div id="foodTable">
        <div className="flex  p-10 py-20">
          <div className="bg-amber-50 w-100 p-4 flex flex-col gap-6 rounded-2xl shadow-2xl">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-(--color-primary) flex justify-center">WELC<img src={pizza} alt="" className='w-8 h-8 animate-spin [animation-duration:6s]' />ME</h1>
              <p className="opacity-60">Login to your Cravings account</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label htmlFor="Email">Enter your Email</label>
              <input

                type="email"
                name="Email"
                id="Email"
                onChange={handleChange}
                placeholder="Enter your Email"
                className="border p-2"
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
                <div
                  onClick={() => setIsForgotPasswordModalOpen(true)}
                  className="text-sm text-(--color-primary) hover:underline transition-colors"
                >
                  Forgot Password?
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-(--color-primary) text-white font-semibold rounded-md hover:bg-orange-700 transition-colors duration-300 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    handleGoogleLogin(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
                <h1 className="text-center mt-1">
                  Do you have account?
                  <Link
                    to="/register"
                    className="text-(--color-primary)hover:underline"
                  >
                    Create an account
                  </Link>
                </h1>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isForgotPasswordModalOpen && (
        <ForgotPasswordModal
          open={isForgotPasswordModalOpen}
          onClose={() => setIsForgotPasswordModalOpen(false)}
        />
      )}

    </>
  )
};

export default Login;