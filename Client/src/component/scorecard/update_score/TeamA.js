import React, { useContext, useEffect, useState } from 'react'
import { ScoreCardContext } from '../../../context/ScoreCardContext';

const TeamA = ({ setBowler, setStrikerBatsman, setNonStrikerBatsman, bowler, strikerbatsman, nonStrickerBatsman, teamAPlayers, teamBPlayers }) => {
    const { challenge } = useContext(ScoreCardContext);
    const [stricker, setStricker] = useState({
        playerName: "",
        playersScore: 0,
        playersSix: 0,
        playersFours: 0,
        playersBall: 0,
        playersOutBy: "",
        playerOver: 0,
        playersMaidenOver: 0,
        playersRunConceeded: 0,
        playersWickettaken: 0,
        playersEconomy: 0,

    });
    const [nonStricker, setNonStricker] = useState({
        playerName: "",
        playersScore: 0,
        playersSix: 0,
        playersFours: 0,
        playersBall: 0,
        playersOutBy: "",
        playerOver: 0,
        playersMaidenOver: 0,
        playersRunConceeded: 0,
        playersWickettaken: 0,
        playersEconomy: 0,

    });
    const [showBowler, setShowBowler] = useState(false);
    const [showStrickerBatsman, setShowStrickerBatsman] = useState(false);
    const [showNonStrickerBatsman, setShowNonStrickerBatsman] = useState(false);

    useEffect(() => {
        if (strikerbatsman && teamAPlayers.length > 0) {  // Ensure these values are set
            const batsman = teamAPlayers.find(item => item.playerName === strikerbatsman);
            console.log("This is batsman", batsman);
            setStricker(batsman);
            console.log(batsman);
            setShowStrickerBatsman(true);
        }
    }, [strikerbatsman, teamAPlayers])
    useEffect(() => {
        if (nonStrickerBatsman && teamAPlayers.length > 0) {  // Ensure these values are set
            const batsman = teamAPlayers.find(item => item.playerName === nonStrickerBatsman);
            console.log("This is NON STRICKER batsman", batsman);
            setNonStricker(batsman);
            setShowNonStrickerBatsman(true);
        }
    }, [nonStrickerBatsman, teamAPlayers])

    console.log("this is TeamAPlayers", teamAPlayers, teamBPlayers);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 col-8 p-4'>
                    <div className='row'>
                        <div className='d-flex align-items-center py-2 px-3 my-2 friendListItem rounded' style={{ background: "black", color: "white" }}>
                            <div className='flex-grow-1'>
                                <h6 className='m-0'>{challenge.teamA}</h6>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div className='mx-1'>
                                    <small>R</small>
                                </div>
                                <div className='mx-1'>
                                    <small>B</small>
                                </div>
                                <div className='mx-1'>
                                    <small>4</small>
                                </div>
                                <div className='mx-1'>
                                    <small>6</small>
                                </div>
                                <div className='mx-1'>
                                    <small>SR</small>
                                </div>
                                <div className=''>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ visibility: 'hidden' }} width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        showStrickerBatsman ?
                            <div className={`d-flex align-items-center py-2 px-3 my-0 friendListItem`} >
                                <div className='me-3'>
                                    <img
                                        src={"https://github.com/mdo.png"}
                                        className='rounded-circle'
                                        alt={'...//////'}
                                        style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                    />
                                </div>
                                <div className='flex-grow-1'>
                                    <h6 className='mb-0' style={{ fontWeight: "600", color: "#050505" }}>
                                        {stricker.playerName}
                                    </h6>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <div className='mx-1'>
                                        <small>{stricker.playersScore}</small>
                                    </div>
                                    <div className='mx-1'>
                                        <small>{stricker.playersBall}</small>
                                    </div>
                                    <div className='mx-1'>
                                        <small>{stricker.playersFours}</small>
                                    </div>
                                    <div className='mx-1'>
                                        <small>{stricker.playersSix}</small>
                                    </div>
                                    <div className='mx-1'>
                                        <small>0</small>
                                    </div>
                                    <div className='mx-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowStrickerBatsman(false) }} width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='row'>
                                <h6>Please select striker Batsman</h6>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-dark btn-sm dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Stricker Batsman
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {challenge.teamAPlayers.map((element, index) => (
                                            <li key={index} onClick={() => {
                                                setStrikerBatsman(element.value)
                                            }}>
                                                <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                                    <img
                                                        src={"https://github.com/mdo.png"}
                                                        className="rounded-circle me-3"
                                                        alt={"..."}
                                                        style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                                    />
                                                    <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                                        {element.value}
                                                    </h6>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                    }
                    {
                        showNonStrickerBatsman ?
                            <>
                                <div className={`d-flex align-items-center py-2 px-3 my-0 friendListItem`} >
                                    <div className='me-3'>
                                        <img
                                            src={"https://github.com/mdo.png"}
                                            className='rounded-circle'
                                            alt={'...//////'}
                                            style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className='flex-grow-1'>
                                        <h6 className='mb-0' style={{ fontWeight: "600", color: "#050505" }}>
                                            {nonStricker.playerName}
                                        </h6>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div className='mx-1'>
                                            <small>{nonStricker.playersScore}</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>{nonStricker.playersBall}</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>{nonStricker.playersFours}</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>{nonStricker.playersSix}</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>0</small>
                                        </div>
                                        <div className='mx-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowNonStrickerBatsman(false) }} width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <div className='row'>
                                <h6>Please select Non-Stricker Batsman</h6>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-dark btn-sm dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Non Stricker Batsman
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {challenge.teamAPlayers.map((element, index) => (
                                            <li key={index} onClick={() => { setNonStrikerBatsman(element.value) }}>
                                                <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                                    <img
                                                        src={"https://github.com/mdo.png"}
                                                        className="rounded-circle me-3"
                                                        alt={"..."}
                                                        style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                                    />
                                                    <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                                        {element.value}
                                                    </h6>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                    }
                </div>
                <div className='col-md-4 col-4 p-4'>
                    {
                        showBowler ?
                            <>
                                <div className='d-flex align-items-center py-2 px-3 my-2 friendListItem rounded' style={{ background: "black", color: "white" }}>
                                    <div className='flex-grow-1'>
                                        <h6 className='m-0'>{challenge.teamB}</h6>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <div className='mx-1'>
                                            <small>O</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>M</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>R</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>W</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>E</small>
                                        </div>
                                        <div className=''>
                                            <svg xmlns="http://www.w3.org/2000/svg" style={{ visibility: 'hidden' }} width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className={`d-flex align-items-center py-2 px-3 my-0 friendListItem`} >
                                    <div className='me-3'>
                                        <img
                                            src={"https://github.com/mdo.png"}
                                            className='rounded-circle'
                                            alt={'...//////'}
                                            style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className='flex-grow-1'>
                                        <h6 className='mb-0' style={{ fontWeight: "600", color: "#050505" }}>
                                            {bowler}
                                        </h6>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div className='mx-1'>
                                            <small>0</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>0</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>0</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>0</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>0</small>
                                        </div>
                                        <div className='mx-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowBowler(false) }} width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </> :
                            <div className='row '>
                                <h6 >Please select Bowler</h6>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-dark btn-sm dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Select a Bowler
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {challenge.teamBPlayers.map((element, index) => (
                                            <li key={index} onClick={() => { setBowler(element.value); setShowBowler(true); }}>
                                                <div className="dropdown-item d-flex align-items-center py-2 px-3 my-0 friendListItem hover-effect">
                                                    <img
                                                        src={"https://github.com/mdo.png"}
                                                        className="rounded-circle me-3"
                                                        alt={"..."}
                                                        style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                                    />
                                                    <h6 className="mb-0" style={{ fontWeight: "600", color: "#050505" }}>
                                                        {element.value}
                                                    </h6>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                    }
                </div>
            </div>


        </div>
    )
}

export default TeamA
