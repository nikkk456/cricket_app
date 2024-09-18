import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/SocketContext';


function LiveScore() {
    const socket = useContext(SocketContext);
    const [score, setScore] = useState({ runs: 0, wickets: 0, overs: 0 });
    useEffect(() => {
        if (!socket) {
            console.log("Socket is not initialised yet in scoreUpdate Page");
        } else {
            socket.on('scoreUpdate', (newScore) => {
                setScore(newScore);
            });
        }
    }, [socket]);
    

    // useEffect(() => {
        

    //     return () => socket.off('scoreUpdate');
    // }, []);

    return (
        <div>
            <h2>Live Score</h2>
            <p>Runs: {score.runs}</p>
            <p>Wickets: {score.wickets}</p>
            <p>Overs: {score.overs}</p>
        </div>
    );
}

export default LiveScore;
