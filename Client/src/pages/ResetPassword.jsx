import axios from "axios";
import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdOutlineEmail } from "react-icons/md";
import { NavBar } from "../components/allComponents";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { BACKENDURL } = useContext(AppContext);
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    try {
      const response = await axios.post(`${BACKENDURL}/send-reset-otp`, { email });
      toast.success((response.data.message || "OTP sent successfully!"), { duration: 5000 });
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
      return
    }  

    if (otp.length != 6) {
          toast.error("Enter a valid 6 digit OTP")
          return
    }

    try {
      const response = await axios.post(`${BACKENDURL}/verify-reset-otp`, { email, otp });
      toast.success(response.data.message || "OTP verified successfully!");
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  // Step 2: Resend OTP
  const handleResendOtp = async () => {
    try {
      const response = await axios.post(`${BACKENDURL}/send-reset-otp`, { email });
      toast.success((response.data.message || "OTP resent successfully!"), { duration: 5000 });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password) return toast.error("Please enter a new password");

    try {
      const response = await axios.post(`${BACKENDURL}/reset-password`, { email, password });
      toast.success(response.data.message || "Password reset successfully!");
    //   setStep(1);
      setEmail("");
      setOtp("");
      setPassword("");
      navigate("/login")
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="mt-[60px]"></div>

      <div className="min-h-[91vh] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow-2xl">
          {step === 1 && (
            <>
              <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
                <p className="text-[15px] text-slate-500">
                  Enter your registered email address to receive a verification code.
                </p>
              </header>
              <form onSubmit={handleSendOtp}>
                <div> 
                  <div className="relative flex items-center mb-6">
                    <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    placeholder="Enter your email address"
                    className="w-full h-12 px-4 text-base text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded-lg outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-150"
                    required
                    autoComplete="true"
                  />
                    <a className='w-[18px] h-[18px] absolute right-4 cursor-pointer text-xl'><MdOutlineEmail /></a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
                >
                  Send Verification Code
                </button>

              </form>
            </>
          )}

          {step === 2 && (
            <>
              <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1">Enter OTP</h1>
                <p className="text-[15px] text-slate-500">
                  Enter the verification code sent to your email.
                </p>
              </header>
              <form onSubmit={handleVerifyOtp}>
                <div className="mb-6">
                  <input
                    type="text"
                    id="otp"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only digits
                      if (/^\d*$/.test(value)) {
                        setOtp(value);
                      }
                    }}
                    placeholder="Enter OTP"
                    className="w-full h-12 px-4 text-base text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded-lg outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-150"
                    required
                  />
                </div>
                <div className="flex justify-between items-center mb-6">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-indigo-500 hover:underline text-sm"
                  >
                    Resend OTP
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
                >
                  Verify OTP
                </button>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1">Reset Password</h1>
                <p className="text-[15px] text-slate-500">
                  Enter your new password below to reset your account password.
                </p>
              </header>
              <form onSubmit={handleResetPassword}>
                <div className="mb-6">
                  <div className="relative flex items-center">
                    <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    placeholder="Enter new password"
                    className="w-full h-12 px-4 text-base text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded-lg outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-150"
                    required
                  />
                    <a className="w-[18px] h-[18px] absolute right-4 cursor-pointer text-xl" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
                >
                  Reset Password
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

