import React from 'react'

const CatchSelection = ({ caughtOut, firstInnings, challenge, teamAPlayersData, teamBPlayersData, strikerbatsman, setTeamAPlayersData, setTeamBPlayersData, setWicketTaken, setCaughtOut }) => {

    const handleCatchSelection = (element, teamSetter, teamData, teamKey) => {
        teamSetter(prevPlayers => {
            return prevPlayers.map(player => {
                if (player.playerName === strikerbatsman) {
                    return { ...player, playerCaughtBy: element.playerName };
                }
                return player;
            });
        });
        setWicketTaken(true);
        setCaughtOut(false);
    };

    const playersData = firstInnings === challenge.teamA ? teamBPlayersData : teamAPlayersData;
    const teamSetter = firstInnings === challenge.teamA ? setTeamAPlayersData : setTeamBPlayersData;

    return (
        <div className={`overlay ${caughtOut ? '' : 'hidden'}`}>
        <div className="card" style={{ width: "18rem", height: "12.65rem" }}>
          <div className="card-body d-flex" style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h4 className="card-title text-center" style={{ marginBottom: "1.5rem" }}>Who takes this Catch?</h4>
            <div className="dropdown">
              <button
                className="btn btn-dark btn-sm dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Player
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {playersData.map((element, index) => (
                  <li key={index} onClick={() => handleCatchSelection(element, teamSetter, playersData)}>
                    <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                      <img
                        src={"https://github.com/mdo.png"}
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
          </div>
        </div>
      </div>
    )
}

export default CatchSelection
