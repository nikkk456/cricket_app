import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/SocketContext';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import Overview from './Overview';
import Score_Card from './score_card/Score_Card';
import Update_score from './update_score/Update_score';


function ScoreUpdate() {
    const location = useLocation();
    const { teamA, teamB, overs, tossWinner } = useParams();
    const socket = useContext(SocketContext);
    useEffect(() => {
        if (!socket) {
            console.log("Socket is not initialised yet in scoreUpdate Page");
        } else {
        }
    }, [socket]);
    const [score, setScore] = useState({ runs: 0, wickets: 0, overs: 0 });

    const handleScoreChange = (e) => {
        setScore({ ...score, [e.target.name]: e.target.value });
    };

    const sendScoreUpdate = () => {
        socket.emit('updateScore', score);
    };

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
                            <h6 className='mt-2'>{teamA}</h6>
                        </div>
                        <div className='col-md-4 col-4 p-2' style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center" }}>
                            <h5 className='m-0'>
                                0/0
                            </h5>
                            <small>{`(${overs})`}</small>
                        </div>

                    </div>
                </div>
                <div className='col-md-6 col-6'>
                    <div className='row' style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        <div className='col-md-4 col-4 p-2' style={{ display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "center" }}>
                            <h5 className='m-0'>
                                0/0
                            </h5>
                            <small>{`(${overs})`}</small>
                        </div>
                        <div className='col-md-6 col-6' style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                            <img src={"https://github.com/mdo.png"} alt="TeamA" width="50" height="50" className="rounded-circle mx-2 border" style={{ boxShadow: "0px 0px 4px 2px grey" }} />
                            <h6 className='mt-2'>{teamB}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center align-items-center'>
                <center><small>Toss Winner: {tossWinner}</small></center>
                <center><small>Group Stage Match</small></center>
            </div>
            <div className='row'>
                <div className='row justify-content-center my-3'>
                    <div className='col-auto'>
                        <ul className="nav nav-underline">
                            <li className="nav-item mx-2">
                                <Link className={location.pathname.includes('/overview')?"nav-link active":'nav-link'} to="overview">Overview</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className={location.pathname.includes('/score_card')?"nav-link active":'nav-link'} to="score_card">Score-Card</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className='nav-link' to="update_score">Update Score</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Routes>
                <Route path='overview' element={<Overview teamA={teamA} teamB={teamB} overs={overs}/>}/>
                <Route path='score_card/*' element={<Score_Card />}/>
                <Route path='update_score/*' element={<Update_score />}/>
            </Routes>
            {/* <input
                type="number"
                name="runs"
                value={score.runs}
                onChange={handleScoreChange}
                placeholder="Runs"
            />
            <input
                type="number"
                name="wickets"
                value={score.wickets}
                onChange={handleScoreChange}
                placeholder="Wickets"
            />
            <input
                type="number"
                name="overs"
                value={score.overs}
                onChange={handleScoreChange}
                placeholder="Overs"
            />
            <button onClick={sendScoreUpdate}>Update Score</button> */}
        </div>
    );
}

export default ScoreUpdate;
