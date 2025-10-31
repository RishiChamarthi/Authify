import { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { BsPatchCheckFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

import { AccountDropdown } from '../components/allComponents.js'

function NavBar() {
    const { isLoggedIn } = useContext(AppContext);

    return (
        <div>
            <header className="fixed top-0 min-w-screen flex items-center shadow-md py-4 px-6 sm:px-10 bg-white h-[60px] tracking-wide z-50">
                <div className="flex flex-wrap items-center justify-between w-full">
                    <div className='flex items-center justify-between gap-3'>
                        <BsPatchCheckFill className='text-green-400 font-bold text-3xl'/>
                        <Link to={"/"} className="text-3xl font-extrabold text-blue-600 font-bold tracking-wide font-merienda" >Authify</Link>
                    </div>

                    {isLoggedIn ? (
                            <div>
                                <AccountDropdown />
                            </div>
                        ) : (
                            <div className="flex max-lg:ml-auto space-x-4">
                                <Link to={"/login"} className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-slate-900 border border-gray-400 bg-transparent hover:bg-gray-50 transition-all">
                                    Login
                                </Link>
                                
                                <Link to={"/register"} className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all" >
                                    Sign up
                                </Link>
                            </div>
                        )
                    }

                </div>
            </header>
            
        </div>
    )
}

export default NavBar
