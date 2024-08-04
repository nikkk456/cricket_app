import React from 'react'

const SuggestedFriend = () => {
    return (
        <div className='row my-2 border-bottom' style={{ cursor: "pointer" }}>
            <div className='col-md-3 rounded-circle' style={{ width: "17%", display: "flex", alignItems: "center" }}>
                <img src="https://github.com/mdo.png" className='rounded-circle me-2' alt='...' style={{ width: "100%"}} />
            </div>
            <div className='col-md-6 d-flex mx-2' style={{ flexDirection: "column" }}>
                <h5 style={{ margin: "0px" }}>
                    Friend Name
                </h5>
                <p>
                    Playing style
                </p>
            </div>
            <div className='col-md-3 d-flex' style={{ justifyContent: "end", alignItems: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye mx-2" viewBox="0 0 16 16" data-bs-toggle="tooltip" data-bs-title="View Profile">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
            </div>
        </div>
    )
}

export default SuggestedFriend
