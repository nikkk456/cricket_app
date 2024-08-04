import React from 'react'
import {Route, Routes} from 'react-router-dom'
import UserProfile from './UserProfile/UserProfile';
import SideNavbarMin from './SideNavbarMin';
import UserChat from './Chat/UserChat';
import Notification from './Notification/Notification';
import FindFriend from './FindFriend/FindFriend';

const Dashboard = () => {
    return (
        <div className='container-fluid'>
            <div className='row no-gutters' style={{flexDirection:"row", flexWrap:"nowrap"}}>
            {/* <SideNavbar setMinimised={setMinimised} minimised={minimised}/> */}
            <SideNavbarMin/>
            <div className='col' style={{marginLeft:"65px"}}>
                <Routes>
                <Route path= "profile/*" element={<UserProfile/>} />
                <Route path= "chat/*" element={<UserChat/>} />
                <Route path= "notification/*" element={<Notification/>} />
                <Route path= "findfriend/*" element={<FindFriend/>} />
                </Routes>
            </div>
        </div>
        </div>
    )
}

export default Dashboard
