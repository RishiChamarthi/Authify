import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { toast } from 'sonner';
import { register } from '../assets/allAssets.js'

const RegisterForm = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const {BACKENDURL} = useContext(AppContext)

    const onSubmitHandler = async (e) => {
    e.preventDefault()
    axios.defaults.withCredentials = true
    setLoading(true)
    try {
      const response = await axios.post(`${BACKENDURL}/register`, {name, email, password})
      if(response.status == 201) {
        toast.success("Registration successful")
        navigate("/login")
      } else {
        toast.error(response.message)
      }
    } catch(err) {
        if(err.status == 409) {
            toast.error("user already exists")
            navigate("/login")
        } else {
            toast.error(err.response.data.message)
            console.log(err)
        }
    } finally {
        setLoading(false)
    }
  }

    return (
        // signin container
        <div className='mt-[65px] min-h-[91vh] flex items-center justify-center'>
            <div className="flex fle-col items-center justify-center">
                <div className="py-6 px-4">
                    <div className="flex justify-between items-center max-w-6xl w-full">

                        {/* form div */}
                        <div className="w-sm md:w-1/2 border border-slate-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-lg:mx-auto ">
                            <form onSubmit={onSubmitHandler}>
                                {/* Heading */}
                                <div className="mb-4">
                                    <h1 className="text-slate-900 text-3xl font-bold text-center">Sign Up</h1>
                                </div>
                                <div className="space-y-6">
                                    {/* user name */}
                                    <div>
                                        <label className="text-slate-900 text-sm font-medium mb-2 block" htmlFor='username'>User Name</label>
                                        <div className="relative flex items-center">
                                            <input id='username' name="username" type="text" required autoComplete="username" className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name}/>
                                            <a className='w-[18px] h-[18px] absolute right-4 cursor-pointer text-xl'><FaRegUserCircle /></a>
                                        </div>
                                    </div>
                                    {/* email */}
                                    <div>
                                        <label className="text-slate-900 text-sm font-medium mb-2 block" htmlFor='email'>Email</label>
                                        <div className="relative flex items-center">
                                            <input id='email' name="email" type="email" required autoComplete="email" className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                                            <a className='w-[18px] h-[18px] absolute right-4 cursor-pointer text-xl'><MdOutlineEmail /></a>
                                        </div>
                                    </div>
                                    {/* password */}
                                    <div>
                                        <label className="text-slate-900 text-sm font-medium mb-2 block" htmlFor='password'>Password</label>
                                        <div className="relative flex items-center">
                                            <input id='password' name="password" type={showPassword ? "text" : "password"} className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
                                            <a className="w-[18px] h-[18px] absolute right-4 cursor-pointer text-xl" onClick={togglePasswordVisibility}>
                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* create account */}
                                <div className="mt-10">
                                    <button type="submit" disabled={loading}  className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer" >
                                        Create Account
                                    </button>
                                </div>
                                <p className="text-slate-600 text-sm mt-6 text-center">Already have an account? 
                                    <Link to="/login" className="text-blue-600 font-medium hover:underline ml-1">Login here</Link></p>
                            </form>
                        </div>
                        
                        {/* Image div */}
                        <div className="hidden md:block md:w-1/2 max-lg:mt-8">
                            <img src={register} className="w-full aspect-71/50 max-lg:w-4/5 mx-auto object-cover" alt="login img" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
