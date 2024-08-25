import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import UserProfile from './UserProfile/UserProfile';
import SideNavbarMin from './SideNavbarMin';
import UserChat from './Chat/UserChat';
import Notification from './Notification/Notification';
import FindFriend from './FindFriend/FindFriend';
import AccountSetting from './AccountSetting/AccountSetting';
import Navbar from '../Navbar';
import BottomNavbar from '../BottomNavbar';
import Referral from './Referral/Referral';

const Dashboard = () => {
    const [upperNavbar, setUppernavbar] = useState(false);
    useEffect(() => {
        const handleMediaQuery = (mediaQueryList) => {
            if (mediaQueryList.matches) {
                setUppernavbar(true);
            } else {
                setUppernavbar(false);
            }
        }

        const mediaQueryList = window.matchMedia('(max-width: 767px)');
        mediaQueryList.addListener(handleMediaQuery);
        handleMediaQuery(mediaQueryList);

        return () => {
            mediaQueryList.removeListener(handleMediaQuery);
        };
    }, [])

    return (
        <div className='container-fluid'>
            {/* Upper Navbar */}
            <div className='row no-gutters' style={{ flexDirection: "row", flexWrap: "nowrap" }}>
                {/* Side Navbar */}
                {!upperNavbar && <SideNavbarMin />}

                {/* Main Content */}
                <div className='col' style={{ marginLeft: upperNavbar ? "0" : "65px", padding: upperNavbar ? "0" : ""}}>
                    <Routes>
                        <Route path="profile/*" element={<UserProfile />} />
                        <Route path="chat/*" element={<UserChat />} />
                        <Route path="notification/*" element={<Notification />} />
                        <Route path="findfriend/*" element={<FindFriend />} />
                        <Route path="accountsetting/*" element={<AccountSetting />} />
                        <Route path="refer_friends" element={<Referral />} />
                    </Routes>
                </div>
                {upperNavbar && (
                    <BottomNavbar/>
                )}
            </div>
        </div>
    )
}

export default Dashboard
