import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import { AppConstants } from '../util/constatnts.js';
export const AppContext = React.createContext();
import { toast } from 'react-toastify';
import axios from 'axios';

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendURL = AppConstants.BACKEND_URL;

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userData, setUserData] = React.useState(false);

   
    const getUserData = async () => {
    try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            backendURL + "/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.status === 200) {
            setUserData(response.data);
        } else {
            toast.error("Unable to retrieve the profile");
        }

    } catch (error) {
        toast.error(error.message);
    }
}

    const getAuthState = async () => {
    try {

        const token = localStorage.getItem("token");

        if (!token) {
            setIsLoggedIn(false);
            return;
        }

        const response = await axios.get(
            backendURL + "/is-authenticated",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.status === 200) {
            setIsLoggedIn(true);
            await getUserData();
        } else {
            setIsLoggedIn(false);
        }

    } catch (error) {

        if (error.response?.status === 401) {
            setIsLoggedIn(false);
        } else {
            const msg =
                error.response?.data?.message ||
                "Authentication check failed";

            toast.error(msg);
            setIsLoggedIn(false);
        }
    }
}

    useEffect(() => {
        getAuthState();
    }, []);

    const contextValue = {
        backendURL,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData,
    }
    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}