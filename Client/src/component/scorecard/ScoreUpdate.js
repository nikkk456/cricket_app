import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/SocketContext';
import { Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import Overview from './Overview';
import Score_Card from './score_card/Score_Card';
import Update_score from './update_score/Update_score';
import { ScoreCardContext } from '../../context/ScoreCardContext';


function ScoreUpdate() {
    const location = useLocation();
    const navigate = useNavigate();
    const [teamAScore, setTeamAScore] = useState(0);
    const [teamBScore, setTeamBScore] = useState(0);
    const [teamAWickets, setTeamAWickets] = useState(0);
    const [teamBWickets, setTeamBWickets] = useState(0);
    const [teamAOvers, setTeamAOvers] = useState(0);
    const [teamBOvers, setTeamBOvers] = useState(0);
    const { challenge, setChallenge } = useContext(ScoreCardContext);
    const { teamA, teamB, overs, tossWinner } = useParams();
    const socket = useContext(SocketContext);
    console.log(challenge);
    useEffect(() => {
        if (!socket) {
            console.log("Socket is not initialised yet in scoreUpdate Page");
        } else {
        }
    }, [socket]);
    const [score, setScore] = useState({ runs: 0, wickets: 0, overs: 0 });

    const sendScoreUpdate = () => {
        socket.emit('updateScore', score);
    };
    const handleNavigate = () => {
        const newPath = 'update_score';  // Relative to current nested route
        console.log('Navigating to:', newPath);
        navigate(newPath);
    };

    // Initial object structure
    const playerTemplate = {
        playerName: "",
        playersScore: 0,
        playersSix: 0,
        playersFours: 0,
        playersBall: 0,
        playersOutBy: "",
        playerOver:0,
        playersMaidenOver:0,
        playersRunConceeded:0,
        playersWickettaken:0,
        playersEconomy:0,

    };

    // Create a new array with player names filled in
    const teamAPlayers = challenge.teamAPlayers.map(player => ({
        ...playerTemplate, // copy the template
        playerName: player.value // set the playerName
    }));
    const teamBPlayers = challenge.teamBPlayers.map(player => ({
        ...playerTemplate, // copy the template
        playerName: player.value // set the playerName
    }));


    return (
        <div className='container'>
            <div className='row text-center'>
                <h2>Update Live Score</h2>
            </div>
            <div className='row'>
                <div className='col-md-6 coll-6'>
                    <div className='row'>
                        <div className='col-md-6 col-6' style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
                            <img src={"https://i.ibb.co/tMDN1vK/cricket-team.jpg"} alt="TeamA" width="50" height="50" className="rounded-circle mx-2 border" style={{ boxShadow: "0px 0px 4px 2px grey" }} />
                            <h6 className='mt-2'>{challenge.teamA}</h6>
                        </div>
                        <div className='col-md-4 col-4 p-2' style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center" }}>
                            <h5 className='m-0'>
                                {teamAScore}/{teamAWickets}
                            </h5>
                            <small>{`(${Math.floor(teamAOvers / 6)}.${(teamAOvers - (Math.floor(teamAOvers / 6) * 6))}/${challenge.overs})`}</small>
                        </div>

                    </div>
                </div>
                <div className='col-md-6 col-6'>
                    <div className='row' style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        <div className='col-md-4 col-4 p-2' style={{ display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "center" }}>
                            <h5 className='m-0'>
                                {teamBScore}/{teamBWickets}
                            </h5>
                            <small>{`(${Math.floor(teamBOvers / 6)}.${(teamBOvers - (Math.floor(teamBOvers / 6) * 6))}/${challenge.overs})`}</small>
                        </div>
                        <div className='col-md-6 col-6' style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                            <img src={"https://github.com/mdo.png"} alt="TeamA" width="50" height="50" className="rounded-circle mx-2 border" style={{ boxShadow: "0px 0px 4px 2px grey" }} />
                            <h6 className='mt-2'>{challenge.teamB}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center align-items-center'>
                <center><small>Toss Winner: {challenge.tossWinner}</small></center>
                <center><small>Group Stage Match</small></center>
            </div>
            <div className='row'>
                <div className='row justify-content-center my-3'>
                    <div className='col-auto'>
                        <ul className="nav nav-underline">
                            <li className="nav-item mx-2">
                                <Link className={location.pathname.includes('/overview') ? "nav-link active" : 'nav-link'} to="overview">Overview</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className={location.pathname.includes('/score_card') ? "nav-link active" : 'nav-link'} to="score_card">Score-Card</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link
                                    className={location.pathname.includes('/update_score') ? "nav-link active" : 'nav-link'} to="update_score" >
                                    Update Score
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Routes>
                <Route path='overview' element={<Overview teamA={teamA} teamB={teamB} overs={overs} />} />
                <Route path='score_card/*' element={<Score_Card />} />
                <Route path='update_score' element={<Update_score teamAScore={teamAScore} teamBScore={teamBScore} teamAWickets={teamAWickets} teamBWickets={teamBWickets} setTeamAScore={setTeamAScore} setTeamBScore={setTeamBScore} setTeamAWickets={setTeamAWickets} setTeamBWickets={setTeamBWickets} setTeamAOvers={setTeamAOvers} setTeamBOvers={setTeamBOvers} teamAPlayers={teamAPlayers} teamBPlayers={teamBPlayers} teamAOvers={teamAOvers} teamBOvers={teamBOvers} />} />
            </Routes>
        </div>
    );
}

export default ScoreUpdate;
