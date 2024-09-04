import React from 'react'

const RecentMatch = () => {
    return (
        <div className="card mx-2 my-2" style={{ width: "18rem", height: "250px" }}>
            <div className="card-body">
                <h6 className="card-title text-center">
                    <img src={"https://i.ibb.co/tMDN1vK/cricket-team.jpg"} alt="TeamA" width="50" height="50" className="rounded-circle mx-2 border" style={{ boxShadow: "0px 0px 4px 2px grey" }} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-lightning-fill" viewBox="0 0 16 16">
                        <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
                    </svg>
                    <img src={"https://github.com/mdo.png"} alt="Team" width="50" height="50" style={{ boxShadow: "0px 0px 4px 2px grey" }} className="rounded-circle mx-2" />
                </h6>
                <p className="card-text">
                    <strong>Date:</strong> 04-Sep-2024<br />
                    <strong>Teams:</strong> Bengal Tigers VS UP Warriers <br />
                    <strong>Score:</strong> 100/102<br />
                    <strong>Winner:</strong> UP Warriers
                </p>
                <a href="#" className="btn btn-dark btn-sm">View</a>
            </div>
        </div>
    )
}

export default RecentMatch
