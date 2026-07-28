import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../config/connect";

const VerifyRegisterOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location.state;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (!formData) {
      navigate("/register");
    }
  }, []);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      return toast.error("Please enter OTP");
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-register-otp", {
        ...formData,
        otp,
      });

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "OTP Verification Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);

      const res = await api.post("/auth/send-register-otp", {
        Email: formData.Email,
      });

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-2">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mb-5">
          OTP sent to
        </p>

        <p className="text-center font-semibold mb-6">
          {formData?.Email}
        </p>

        <form onSubmit={handleVerifyOtp} className="space-y-4">

          <input
            type="text"
            placeholder="Enter 6 Digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="border w-full p-3 rounded outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-(--color-primary) text-white p-3 rounded"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        <button
          onClick={handleResendOtp}
          disabled={resendLoading}
          className="mt-4 text-(--color-primary) w-full"
        >
          {resendLoading ? "Sending..." : "Resend OTP"}
        </button>

      </div>
    </div>
  );
};

export default VerifyRegisterOtp;