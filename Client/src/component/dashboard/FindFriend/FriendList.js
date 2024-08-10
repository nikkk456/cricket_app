import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FriendList.module.css';

const FriendList = ({ name, playingStyle, imageUrl, index }) => {
    // Determine background color based on index
    const navigate = useNavigate();
    const bgColor = index % 2 === 0 ? 'rgb(244 240 240);' : 'rgb(239 239 239);'; // Light grey and light white

    const handleClick = ()=>{
        navigate('/playerprofile/:id/about')
    }
    return (
        <div 
            className={`d-flex align-items-center py-2 px-3 my-2 friendListItem ${styles.friendListItem}`}
            style={{ backgroundColor: bgColor }} onClick={handleClick}
        >
            <div className='me-3'>
                <img 
                    src={imageUrl || "https://github.com/mdo.png"} 
                    className='rounded-circle' 
                    alt={name} 
                    style={{ width: "50px", height: "50px", objectFit: "cover" }} 
                />
            </div>
            <div className='flex-grow-1'>
                <h6 className='mb-0' style={{ fontWeight: "600", color: "#050505" }}>
                    {name || 'Friend Name'}
                </h6>
                <p className='mb-0' style={{ fontSize: "13px", color: "#65676B" }}>
                    {playingStyle || 'Playing style'}
                </p>
            </div>
            <div>
                <button type='button' className='btn btn-light btn-sm' style={{ border: "1px solid #ddd", fontWeight: "500" }}>
                    Connect
                </button>
            </div>
        </div>
    );
};

export default FriendList;
