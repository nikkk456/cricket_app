import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/SocketContext';
import { useParams } from 'react-router-dom';


function ScoreUpdate() {
    const { teamA, teamB } = useParams();
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
            <div className='row text-center'>
                <div className='col-md-6 col-6'>
                    <img src={"https://i.ibb.co/tMDN1vK/cricket-team.jpg"} alt="TeamA" width="50" height="50" className="rounded-circle mx-2 border" style={{ boxShadow: "0px 0px 4px 2px grey" }} />
                    <h4 className='mt-2'>{teamA}</h4>
                </div>
                <div className='col-md-6 col-6'>
                    <img src={"https://github.com/mdo.png"} alt="TeamA" width="50" height="50" className="rounded-circle mx-2 border" style={{ boxShadow: "0px 0px 4px 2px grey" }} />
                    <h4 className='mt-2'>{teamB}</h4>
                </div>
            </div>
            <div className='row mt-2 text-center'>
                <div className='col-md-6 col-6'>
                    <h4>
                        0/0
                    </h4>
                </div>
                <div className='col-md-6 col-6'>
                    <h4>
                        0/0
                    </h4>
                </div>
            </div>
            <input
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
            <button onClick={sendScoreUpdate}>Update Score</button>
        </div>
    );
}

export default ScoreUpdate;
