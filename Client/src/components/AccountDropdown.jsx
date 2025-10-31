import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";

function AccountDropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef(null);
    const dropdown = useRef(null);

    const { userData, logout } = useContext(AppContext);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <section className="bg-gray-2 py-20 text-black">
            <div className="container">
                <div className="flex justify-center">
                    <div className="relative inline-block">
                        {/* User Icon */}
                        <div ref={trigger} onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex h-10 items-center justify-center gap-2 bg-white text-base font-medium text-black cursor-pointer">
                            <div className="w-10 h-10 rounded-full border bg-blue-600 text-white text-xl lg:text-2xl flex items-center justify-center">
                                <FaUser />
                            </div>
                        </div>

                        {/* complete drop down */}
                        <div ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)}
                            className={`absolute right-1 top-full mt-1 w-60 divide-y divide-gray-300 overflow-hidden rounded-lg bg-white shadow-md border border-gray-200 ${dropdownOpen ? "block" : "hidden"}`}>
                            
                            {/* User Section */}
                            <div className="flex items-center gap-3 px-3 py-3">
                                {/* User icon */}
                                <div className="relative aspect-square w-10 rounded-full">
                                    <div className="w-10 h-10 rounded-full border bg-blue-600 text-white text-xl lg:text-2xl flex items-center justify-center">
                                        <FaUser />
                                    </div>
                                </div>
                                {/* User Details */}
                                <div className="">
                                    <p className="text-sm font-semibold text-dark w-[150px] overflow-hidden text-ellipsis">
                                        {userData?.name || "Developer"}
                                    </p>
                                    <p className="text-sm text-body-color w-[150px] overflow-hidden text-ellipsis">
                                        {userData?.email || "developer@gmail.com"}
                                    </p>
                                </div>
                            </div>

                            <div>
                                {/* Account Verification */}
                                {!userData.isAccountVerified && (
                                    <Link to={"/verify-account"} className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-dark hover:bg-gray-50 dark:hover:bg-white/5" >
                                        <span className="flex items-center gap-2 text-sm">
                                            <div className="text-lg">
                                                <FaUserShield />
                                            </div>
                                            Verify Account
                                        </span>
                                    </Link>
                                )}

                                {/* Logout */}
                                <Link to={"/"} className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-dark hover:bg-gray-50" onClick={logout}>
                                    <span className="flex items-center gap-2 text-sm">
                                        <div className="text-lg">
                                            <TbLogout2 />
                                        </div>
                                        Log out
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AccountDropdown