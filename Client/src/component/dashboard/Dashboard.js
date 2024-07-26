import React, { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import SideNavbar from './SideNavbar';
import UserProfile from './UserProfile/UserProfile';

const Dashboard = () => {
    const [minimised, setMinimised]= useState(false);
    return (
        <div className='container-fluid'>
            <div className='row no-gutters' style={{flexDirection:"row", flexWrap:"nowrap"}}>
            <SideNavbar setMinimised={setMinimised} minimised={minimised}/>
            <div className='col'>
                <Routes>
                <Route path= "profile" element={<UserProfile/>} />
                </Routes>
                {/* <Profile/> */}
            </div>
        </div>
        </div>
    )
}

export default Dashboard
