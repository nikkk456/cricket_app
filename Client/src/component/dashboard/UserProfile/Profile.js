import React, { useContext } from 'react'
import { PlayerProfileContext } from '../../../context/PlayerProfileContext'

const Profile = () => {
    const {playerProfileData}  = useContext(PlayerProfileContext);

    return (
        <div className="text-center" style={{marginTop:"-60px"}}>
            <img src="https://github.com/mdo.png" className="rounded-circle mt-n5" alt="Profile" style={{ width: "100px", height: "100px", border: "5px solid white" }} />
            <h2 className="mt-3">{playerProfileData.name || 'Captain Name'}</h2>
            <p>{playerProfileData.address || 'City, India'}</p>
        </div>
    )
}

export default Profile
