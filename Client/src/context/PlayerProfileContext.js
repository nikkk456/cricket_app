import axiosinstance from '../axios/axiosInstance';
import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'

export const PlayerProfileContext = createContext();

export const PlayerProfileProvider = ({ children }) => {
    const [playerProfileData, setPlayerProfileData] = useState({});

    useEffect(() => {
        const value = { user_id: Cookies.get('user_id') };
        const fetchData = async () => {
            await axiosinstance.post("/user/profile", value, {
                headers: {
                    'Authorization': Cookies.get('uid')
                }
            }).then((res) => {
                if (res.status === 201) {
                    setPlayerProfileData(res.data[0]);
                }
                else {
                    console.log("Error while fetching the response ");
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        fetchData();
    }, [])
    return (<PlayerProfileContext.Provider value={{ setPlayerProfileData, playerProfileData }}>
        {children}
    </PlayerProfileContext.Provider>)
}