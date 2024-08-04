import React from 'react'

const FriendList = ({name, playingStyle, imageUrl}) => {
    return (
        <div className='row my-2 border-bottom' style={{ cursor: "pointer" }}>
            <div className='col-md-3 rounded-circle' style={{ width: "17%", display: "flex", alignItems: "center" }}>
                <img src={imageUrl || "https://github.com/mdo.png"} className='rounded-circle me-2' alt='...' style={{ width: "100%" }} />
            </div>
            <div className='col-md-6 d-flex mx-2' style={{ flexDirection: "column" }}>
                <h5 style={{ margin: "0px" }}>
                    {name || 'Friend Name'}
                </h5>
                <p>
                    {playingStyle||'Playing style'}
                </p>
            </div>
            <div className='col-md-3 d-flex' style={{ justifyContent: "end", alignItems: "center" }}>
                <button type='button' className='btn btn-dark'>Connect</button>
            </div>
        </div>
    )
}

export default FriendList
