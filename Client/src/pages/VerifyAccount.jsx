import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { NavBar } from "../components/allComponents";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

const VerifyAccount = () => {
  const { BACKENDURL, userData, getUserData } = useContext(AppContext)
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const storedUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const email = userData?.email || storedUser.email;

  // 🔹 Send OTP (triggered automatically or by Resend button)
  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email not found. Please log in again.");
      return;
    }

    axios.defaults.withCredentials = true;

    try {
      const response = await axios.post(`${BACKENDURL}/send-verify-otp`, { email });
      toast.success((response.data.message || "OTP sent successfully!"), { duration: 5000 });
      setOtp("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  // 🔹 Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    if (otp.trim().length != 6) {
      toast.error("Enter a valid 6 digit OTP")
      return
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${BACKENDURL}/verify-user`, { email, otp });

      if (response.status === 200) {
        toast.success(response.data.message || "Account verified successfully!");
        getUserData()
        navigate("/")

      } else {
        toast.error(response.data.message || "Verification failed!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Send OTP immediately when component loads (optional)
  useEffect(() => {
      handleResendOtp();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="mt-[60px]"></div>

      <div className="min-h-[91vh] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Enter OTP</h1>
            <p className="text-[15px] text-slate-500">
              Enter the verification code sent to your email.
            </p>
            <p className="text-[14px] mt-1 text-slate-600 font-medium">{email}</p>
          </header>

          <form onSubmit={handleVerifyOtp}>
            <div className="mb-6">
              <input
                type="text"
                id="otp"
                inputMode="numeric"
                pattern="[0-9]*"
                value={otp}
                maxLength={6}
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
                disabled={isLoading}
                className="text-indigo-500 hover:underline text-sm disabled:opacity-50"
              >
                Resend OTP
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150 disabled:opacity-70"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount