import React from 'react'

const NextStrickerBatsman = ({ wicketTaken,
    nextBatsman,
    strikerBatsman,
    nonStrikerBatsman,
    setStrikerBatsman,
    setWicketTaken,
    firstInnings,
    secondInnings,
    challenge,
    teamAPlayersData,
    teamBPlayersData, }) => {
        if (!wicketTaken) return null;
        const currentTeamPlayersData = (firstInnings === challenge.teamA || secondInnings === challenge.teamA)
        ? teamAPlayersData
        : teamBPlayersData;
    return (
        <div className="overlay">
      <div className="card" style={{ width: "18rem", height: "15.65rem" }}>
        <div className="card-body d-flex" style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h4 className="card-title text-center" style={{ marginBottom: "1.5rem" }}>Select Next Batsman</h4>
          <center>
            <img 
              src="https://github.com/mdo.png" 
              alt="Team" 
              width="50" 
              height="50" 
              style={{ boxShadow: "0px 0px 4px 2px grey" }} 
              className="rounded-circle mx-2" 
            />
          </center>
          <h4 className="card-title text-center my-2">
            {nextBatsman ? nextBatsman.playerName : "No batsman Selected"}
          </h4>
          <div className="d-flex my-3">
            <div className="dropdown">
              <button
                className="btn btn-dark btn-sm dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Choose Other
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {currentTeamPlayersData
                  .filter(player => player.playersOutBy === "" && player.playerName !== strikerBatsman && player.playerName !== nonStrikerBatsman)
                  .map((element, index) => (
                    <li key={index} onClick={() => { setStrikerBatsman(element.playerName); setWicketTaken(false); }}>
                      <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                        <img
                          src="https://github.com/mdo.png"
                          className="rounded-circle me-3"
                          alt="..."
                          style={{ width: "35px", height: "35px", objectFit: "cover" }}
                        />
                        <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                          {element.playerName}
                        </h6>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <button className="btn btn-dark btn-sm mx-2" onClick={() => { setWicketTaken(false); setStrikerBatsman(nextBatsman.playerName); }}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default NextStrickerBatsman
