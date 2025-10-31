import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../assets/allAssets.js'
import { toast } from 'sonner';

const LoginForm = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {BACKENDURL, setIsLoggedIn, getUserData} = useContext(AppContext)

  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    axios.defaults.withCredentials = true
    
    try {
      const response = await axios.post(`${BACKENDURL}/login`, {email, password})
      if(response.status == 200) {
        setIsLoggedIn(true)
        toast.success("Login successful")
        navigate("/")
        getUserData()
      } else {
        toast.error(response.message)
      }
    } catch(err) {
      toast.error(err.response.data.message)
      console.log(err)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    // signin container
    <div className='mt-[65px] min-h-[91vh] flex items-center justify-center'>
      <div className="flex fle-col items-center justify-center">
        <div className="py-6 px-4">
          <div className="flex justify-between items-center max-w-6xl w-full">

            {/* Image section */}
            <div className="hidden md:block max-lg:mt-8 md:w-1/2">
              <img src={login} className="w-full aspect-71/50 max-lg:w-4/5 mx-auto object-cover" alt="login img" />
            </div>

            <div className="md:w-1/2 border border-slate-300 rounded-lg p-6 w-sm max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-lg:mx-auto">
              
              {/* Form */}
              <form className="space-y-6" onSubmit={onSubmitHandler}>
                {/* Heading */}
                <div className="mb-4">
                  <h1 className="text-slate-900 text-3xl font-bold text-center">Sign In</h1>
                </div>

                {/* User Email Input */}
                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block" htmlFor='email'>Email</label>
                  <div className="relative flex items-center">
                    <input id='email' name="email" type="email" required autoComplete='email' className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <a className='w-[18px] h-[18px] absolute right-4 cursor-pointer text-xl'><MdOutlineEmail /></a>
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block" htmlFor='password'>Password</label>
                  <div className="relative flex items-center">
                    <input id='password' name="password" type={showPassword ? "text" : "password"} className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
                    <a className="w-[18px] h-[18px] absolute right-4 cursor-pointer text-xl" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Forgot password */}
                  <div className="text-sm">
                    <Link to={"/reset-password"} className="text-blue-600 hover:underline font-medium">
                      Forgot your password?
                    </Link>
                  </div>

                </div>
                
                {/* Already having an account */}
                <div className="mt-8!">
                  <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                    Sign in
                  </button>
                  <p className="text-sm mt-6! text-center text-slate-600">Don't have an account? <Link to="/register" className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap">Register here</Link></p>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
