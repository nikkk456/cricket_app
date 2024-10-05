import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/SocketContext';


function LiveScore() {
    const socket = useContext(SocketContext);
    const [data, setData] = useState({
        teamARun: 0,
      teamBRun: 0,
      teamAPlayersData: [],
      teamBPlayersData: [],
      totalBalls: 0,
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
        <div>
            <h2>Live Score</h2>
            <p>TeamA : {data.teamARun}</p>
            <p>TeamB : {data.teamBRun}</p>
        </div>
    );
}

export default LiveScore;
