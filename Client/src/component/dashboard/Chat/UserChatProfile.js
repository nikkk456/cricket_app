import React from 'react';
import './UserChatProfile.css'; // Importing custom CSS for styling

const UserChatProfile = ({ captain, name, lastMessage = "Hello", lastActive, profilepicture }) => {
    return (
        <div className='user-chat-profile d-flex align-items-center my-2 p-2'>
            <div className='profile-picture-container me-3'>
                <img
                    src={profilepicture ? profilepicture : "https://github.com/mdo.png"}
                    className='profile-picture'
                    alt='Profile'
                />
            </div>
            <div className='profile-details flex-grow-1'>
                <h6 className='mb-1'>
                    <b>{name}</b> {captain && <span className="badge bg-success captain-badge">C</span>}
                </h6>
                <small className='text-muted last-message'>
                    {lastMessage}
                </small>
            </div>
            <div className='last-active-time text-muted'>
                <small>{lastActive}</small>
            </div>
        </div>
    );
}

export default UserChatProfile;
