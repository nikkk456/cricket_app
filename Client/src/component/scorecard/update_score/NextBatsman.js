import React from 'react'

const NextBatsman = ({nextBatsman, setNextBatsman}) => {

    return (
        <div className='container'>
            <div class="card" style={{width: "18rem"}}>
                <img src={"https://github.com/mdo.png"} alt="Team" width="50" height="50" style={{ boxShadow: "0px 0px 4px 2px grey" }} className="rounded-circle mx-2" />
                <div class="card-body">
                    <h5 class="card-title text-center">{nextBatsman.playerName}</h5>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    )
}

export default NextBatsman
