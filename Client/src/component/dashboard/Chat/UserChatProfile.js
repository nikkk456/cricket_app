import React from 'react'

const UserChatProfile = ({ captain, name, lastMessage, lastActive }) => {
    return (
        <div className='row my-2'>
            <div className='col-md-4 rounded-circle' style={{ width: "20%", display: "flex", alignItems: "center" }}>
                <img src="https://github.com/mdo.png" className='rounded-circle me-2' alt='...' style={{ width: "100%", border: "3px solid black" }} />
            </div>
            <div className='col-md-7 d-flex mx-2' style={{ flexDirection: "column" }}>
                <h6 style={{ margin: "0px" }}>
                    <b>{name}</b> {captain ? <span className="badge text-bg-success rounded-circle" style={{fontSize:"x-small"}}>C</span> : ""}
                </h6>
                <small>
                    {lastMessage}
                </small>
            </div>
            <div className='col-md-1'>
                <small>{lastActive}</small>
            </div>
        </div>
    )
}

export default UserChatProfile
