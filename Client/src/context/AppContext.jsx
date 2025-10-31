import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppConstants } from "../util/AppConstants.js"
import { toast } from 'sonner';

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const navigate = useNavigate()

    const BACKENDURL = AppConstants.BACKENDURL;

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true"; // initialize from storage
    });

    const [userData, setUserData] = useState({})

    const getUserData = async () => {
        try {
            const response = await axios.get(BACKENDURL + "/user")
            if (response.status == 200) {
                const data = response.data.data.user
                setUserData(data)
            } else {
                toast.info("Unable to retrive the user data")
            }
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    const logout = async () => {
        axios.defaults.withCredentials = true
        try {
            const response = await axios.post(`${BACKENDURL}/logout`, {})
            if (response.status == 200) {
                localStorage.removeItem("userData");
                localStorage.setItem("isLoggedIn", "false");
                setIsLoggedIn(false)
                toast.success("Logout successful")
                navigate("/")
            } else {
                toast.error("Unable to logout")
            }
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    useEffect(() => {
        const savedUser = localStorage.getItem("userData");
        const loggedIn = localStorage.getItem("isLoggedIn");

        if (savedUser) {
            setUserData(JSON.parse(savedUser));
            setIsLoggedIn(loggedIn === "true");
        }
    }, []);

    useEffect(() => {
        if (userData && Object.keys(userData).length > 0) {
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("isLoggedIn", "true");
        } else {
            localStorage.removeItem("userData");
            localStorage.setItem("isLoggedIn", "false");
        }
    }, [userData]);

    const contextValue = {
        BACKENDURL,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData,
        logout,
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}