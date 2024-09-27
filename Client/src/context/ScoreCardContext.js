import React, { createContext, useState } from "react";


export const ScoreCardContext = createContext();

export const ScoreCardProvider = ({ children }) => {
    const [challenge, setChallenge] = useState({
        teamA: "",
        teamB: "",
        teamAPlayers: [],
        teamBPlayers: [],
        overs: 0,
        startTime: "",
        ChallengeCoins: "",
        tossWinner: "",
        teamAToss:"",
        teamBToss:"",
        tossWinnerSelection:"",
    })

    return (
        <ScoreCardContext.Provider value={{ setChallenge, challenge }}>
            {children}
        </ScoreCardContext.Provider>
    )
}
