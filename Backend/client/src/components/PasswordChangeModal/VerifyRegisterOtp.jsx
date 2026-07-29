import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../config/connect";
import foodTable from "../../assets/foodTable.png";

const VerifyRegisterOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location.state;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!formData) {
      navigate("/send-register-otp");
    }
  }, []);

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      return toast.error("Please enter complete OTP");
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-register-otp", {
        ...formData,
        otp: otpValue,
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
        ...formData,
      });

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div
      id="foodTable"
      className="min-h-screen flex justify-center items-center bg-gray-100"
    >
      <div className="bg-amber-50  p-8 rounded-xl shadow-2xl w-[420px]">

        <h1 className="text-3xl font-bold text-center mb-2 text-(--color-primary)">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500">
          OTP sent to
        </p>

        <p className="text-center font-semibold mb-8">
          {formData?.Email}
        </p>

        <form onSubmit={handleVerifyOtp} className="space-y-6">

          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleOtpChange(e.target.value, index)
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                className="w-12 h-12 border rounded-lg text-center text-xl font-bold outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-orange-300"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-(--color-primary) text-white p-3 rounded-lg hover:opacity-90"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        <button
          onClick={handleResendOtp}
          disabled={resendLoading}
          className="mt-5 w-full text-(--color-primary) font-medium hover:underline"
        >
          {resendLoading ? "Sending..." : "Resend OTP"}
        </button>

      </div>
    </div>
  );
};

export default VerifyRegisterOtp;