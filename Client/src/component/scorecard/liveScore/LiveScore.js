import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import LiveOverview from './LiveOverview';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import CurrentOver from '../update_score/CurrentOver';


function LiveScore() {
    const location = useLocation();
    const socket = useContext(SocketContext);

    const [data, setData] = useState({
        teamARun: 0,
        teamBRun: 0,
        teamAWickets: 0,
        teamBWickets: 0,
        teamAOvers: 0,
        teamBOvers: 0,
        teamAPlayersData: [],
        teamBPlayersData: [],
        totalBalls: 0,
        challenge: {},
        currentOverRuns: [],
    });
    useEffect(() => {
        if (!socket) {
            console.log("Socket is not initialised yet in scoreUpdate Page");
        } else {
            socket.on('scoreUpdate', (data) => {
                setData(data);
            });
        }
    }, [socket]);


    // useEffect(() => {


    //     return () => socket.off('scoreUpdate');
    // }, []);

    return (
        <div className='container'>
            <div className='row text-center'>
                <h2>Live Score</h2>
            </div>
            <div className='row'>
                <div className='col-md-6 coll-6'>
                    <div className='row'>
                        <div className='col-md-6 col-6' style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
                            <img src={"https://i.ibb.co/tMDN1vK/cricket-team.jpg"} alt="TeamA" width="50" height="50" className="rounded-circle mx-2 border" style={{ boxShadow: "0px 0px 4px 2px grey" }} />
                            <h6 className='mt-2'>{data.challenge.teamA}</h6>
                        </div>
                        <div className='col-md-4 col-4 p-2' style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center" }}>
                            <h5 className='m-0'>
                                {data.teamARun}/{data.teamAWickets}
                            </h5>
                            <small>{`(${Math.floor(data.teamAOvers / 6)}.${(data.teamAOvers - (Math.floor(data.teamAOvers / 6) * 6))}/${data.challenge.overs})`}</small>
                        </div>

                    </div>
                </div>
                <div className='col-md-6 col-6'>
                    <div className='row' style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        <div className='col-md-4 col-4 p-2' style={{ display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "center" }}>
                            <h5 className='m-0'>
                                {data.teamBRun}/{data.teamBWickets}
                            </h5>
                            <small>{`(${Math.floor(data.teamBOvers / 6)}.${(data.teamBOvers - (Math.floor(data.teamBOvers / 6) * 6))}/${data.challenge.overs})`}</small>
                        </div>
                        <div className='col-md-6 col-6' style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                            <img src={"https://github.com/mdo.png"} alt="TeamA" width="50" height="50" className="rounded-circle mx-2 border" style={{ boxShadow: "0px 0px 4px 2px grey" }} />
                            <h6 className='mt-2'>{data.challenge.teamB}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center align-items-center'>
                <center><small>Toss Winner: {data.challenge.tossWinner}</small></center>
                <center><small>Group Stage Match</small></center>
            </div>
            <center>
            <div className=' d-flex my-3 flex-column'>
                <p><strong>This Over</strong></p>
                <div className='d-flex justify-content-center'>
                    {
                        data.currentOverRuns.map((ball, index) => (
                            <CurrentOver ball={ball} key={index} />
                        ))
                    }
                </div>
            </div>
            </center>
            <div className='row'>
                <div className='row justify-content-center my-3'>
                    <div className='col-auto'>
                        <ul className="nav nav-underline">
                            <li className="nav-item mx-2">
                                <Link className={location.pathname.includes('/liveoverview') ? "nav-link active" : 'nav-link'} to="liveoverview">Overview</Link>
                            </li>
                            {/* <li className="nav-item mx-2">
                                <Link className={location.pathname.includes('/score_card') ? "nav-link active" : 'nav-link'} to="score_card">Score-Card</Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>











            <Routes>
                <Route path='liveoverview' element={<LiveOverview teamAPlayersData={data.teamAPlayersData} teamBPlayersData={data.teamBPlayersData} challenge={data.challenge} />} />
                {/* <Route path='score_card/*' element={<Score_Card />} /> */}
            </Routes>
        </div>
    );
}

export default LiveScore;
