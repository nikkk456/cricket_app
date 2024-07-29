import React from 'react'

const SuggestedFriends = ({captain}) => {
  return (
    <div className='row my-2'>
            <div className='col-md-3 rounded-circle' style={{ width: "7%", display: "flex", alignItems: "center" }}>
                <img src="https://github.com/mdo.png" className='rounded-circle me-2' alt='...' style={{ width: "100%", border: "3px solid black" }} />
            </div>
            <div className='col-md-4 d-flex mx-2' style={{ flexDirection: "column" }}>
                <h5 style={{ margin: "0px" }}>
                    Friend Name (Team Name) {captain === "true" ? <span class="badge text-bg-success rounded-circle" style={{fontSize:"x-small"}}>C</span> : ""}
                </h5>
                <p>
                    Playing style
                </p>
            </div>
            <div className='col-md-3'>

            </div>
            <div className='col-md-3 d-flex' style={{justifyContent:"end"}}>
                <button type='button' className='btn btn-dark rounded-pill' style={{height:"40px"}} >
                    connect
                </button>
            </div>
        </div>
  )
}

export default SuggestedFriends
