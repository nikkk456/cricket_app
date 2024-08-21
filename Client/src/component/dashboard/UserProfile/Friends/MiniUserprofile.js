import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../FindFriend/FriendList.module.css';

const MiniUserprofile = ({ name, playingStyle, imageUrl, index, playerId }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/playerprofile/${playerId}/about`, { state: { playerId: playerId } });
    }
    return (
        <div
            className={`d-flex align-items-center py-2 px-3 my-2 friendListItem ${styles.friendListItem}`}
            style={{ backgroundColor: index % 2 === 0 ? 'rgb(244 240 240)' : 'rgb(239 239 239)' }} onClick={handleClick}
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
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye mx-2" viewBox="0 0 16 16" onClick={handleClick}>
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-dots mx-2" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-slash" viewBox="0 0 16 16">
                    <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                </svg>
            </div>
        </div>
    )
}

export default MiniUserprofile
