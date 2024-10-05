import React, { useContext, useEffect, useState } from 'react'
import { ScoreCardContext } from '../../../context/ScoreCardContext';
import CurrentOver from './CurrentOver';

const TeamB = ({ setBowler, setStrikerBatsman, setNonStrikerBatsman, bowler, strikerbatsman, nonStrickerBatsman, teamAPlayers, teamBPlayers, currentOverRuns }) => {
    const { challenge, setChallenge } = useContext(ScoreCardContext);
    const [showBowler, setShowBowler] = useState(false);
    const [showStrickerBatsman, setShowStrickerBatsman] = useState(false);
    const [showNonStrickerBatsman, setShowNonStrickerBatsman] = useState(false);
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
    const [currentBowler, setCurrentBowler] = useState({
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
    })
    const [showFireIcon, setShowFireIcon] = useState(false);
    function toggleSix(ball){
        let timer;
        if (ball === '6') {
            timer = setTimeout(() => {
                setShowFireIcon((prev) => !prev);
            }, 2000); 
        }
    }

    useEffect(() => {
        if (strikerbatsman && teamBPlayers.length > 0) {  // Ensure these values are set
            const batsman = teamBPlayers.find(item => item.playerName === strikerbatsman);
            console.log("This is batsman", batsman);
            setStricker(batsman);
            console.log(batsman);
            setShowStrickerBatsman(true);
        }
    }, [strikerbatsman, teamBPlayers])
    useEffect(() => {
        if (nonStrickerBatsman && teamBPlayers.length > 0) {  // Ensure these values are set
            const batsman = teamBPlayers.find(item => item.playerName === nonStrickerBatsman);
            console.log("This is NON STRICKER batsman", batsman);
            setNonStricker(batsman);
            setShowNonStrickerBatsman(true);
        }
    }, [nonStrickerBatsman, teamAPlayers])
    useEffect(() => {
        if (bowler && teamAPlayers.length > 0) {
            const currentbowler = teamAPlayers.find(item => item.playerName == bowler);
            console.log("This is Current Bowler=========>", bowler);
            setCurrentBowler(currentbowler);
            setShowBowler(true);
        }
    }, [bowler, teamBPlayers])
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-4 p-4'>
                    <div className='row'>
                        <div className='row'>
                            <div className='d-flex align-items-center py-2 px-3 my-2 friendListItem rounded' style={{ background: "black", color: "white" }}>
                                <div className='flex-grow-1'>
                                    <h6 className='m-0'>{challenge.teamA}</h6>
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
                        </div>
                    </div>
                    {
                        showBowler ?
                            <>
                                <div className={`d-flex align-items-center py-2 my-0 friendListItem`} >
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
                                            {currentBowler.playerName || "No one"}
                                        </h6>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div className='mx-1'>
                                            <small>{currentBowler.playerOver}</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>{currentBowler.playersMaidenOver}</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>{currentBowler.playersRunConceeded}</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>{currentBowler.playersWickettaken}</small>
                                        </div>
                                        <div className='mx-1'>
                                            <small>
                                                {isNaN(currentBowler.playersRunConceeded / (Math.floor(currentBowler.playerOver) + (currentBowler.playerOver % 1) * 10 / 6))
                                                    ? '0'
                                                    : (currentBowler.playersRunConceeded / (Math.floor(currentBowler.playerOver) + (currentBowler.playerOver % 1) * 10 / 6)).toFixed(2)
                                                }
                                            </small>
                                        </div>

                                        <div className='mx-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowBowler(false) }} width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className=' d-flex my-3 flex-column'>
                                    <p><strong>This Over</strong></p>
                                    <div className='d-flex no-scrollbar overflow-auto' style={{ maxHeight: '100px', width: '100%', overflow: 'auto' }}>
                                        {
                                            currentOverRuns.map((ball, index) => (
                                                <CurrentOver ball={ball} key={index}/>
                                            ))
                                        }
                                    </div>

                                </div>
                            </>
                            :
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
                                        {challenge.teamAPlayers.map((element, index) => (
                                            <li key={index} onClick={() => { setBowler(element.value) }}>
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
                <div className='col-md-8 p-4'>
                    <div className='row'>
                        <div className='d-flex align-items-center py-2 px-3 my-2 friendListItem rounded' style={{ background: "black", color: "white" }}>
                            <div className='flex-grow-1'>
                                <h6 className='m-0'>{challenge.teamB}</h6>
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
                                        {strikerbatsman} <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill-rule="evenodd" clip-rule="evenodd" className="mx-2" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 1707 1707" id="bat">
                                            <path d="M355 1653l-302 -301 -11 11c-56,56 -56,149 0,205l96 96c57,57 149,57 206,0l11 -11zm86 -86l-302 -301 -71 72 301 301 72 -72zm83 -83l-302 -301 -69 69 302 301 69 -69zm86 -85l-302 -302 -71 72 301 301 72 -71zm669 -748l0 0 -45 -84 -382 302c-9,7 -21,-5 -14,-14l301 -382 -84 -45c-24,-13 -54,-24 -76,-2l-657 657 302 301 657 -657c21,-21 11,-52 -2,-76zm-373 150l317 -249 114 -115 -68 -68 -114 115 -249 317zm446 -378l71 -71 -68 -69 -72 72 69 68zm85 -85l67 -67 -68 -68 -67 66 68 69zm81 -81l72 -72 -68 -68 -72 72 68 68zm86 -86l97 -97c8,-8 8,-21 0,-29l-39 -39c-8,-8 -21,-8 -30,0l-96 97 68 68z"></path>
                                        </svg>
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
                                        <small>
                                            {isNaN(stricker.playersScore / stricker.playersBall)
                                                ? '0'
                                                : ((stricker.playersScore / stricker.playersBall) * 100).toFixed(1)}
                                        </small>
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
                                <h6 className='text-end'>Please select striker Batsman</h6>
                                <div className="dropdown text-end">
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
                                        {challenge.teamBPlayers.map((element, index) => (
                                            <li key={index} onClick={() => { setStrikerBatsman(element.value) }}>
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
                                        {nonStrickerBatsman}
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
                                        <small>
                                            {isNaN(nonStricker.playersScore / nonStricker.playersBall)
                                                ? '0'
                                                : ((nonStricker.playersScore / nonStricker.playersBall) * 100).toFixed(1)}
                                        </small>
                                    </div>

                                    <div className='mx-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowNonStrickerBatsman(false) }} width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='row'>
                                <h6 className='text-end'>Please select Non-Stricker Batsman</h6>
                                <div className="dropdown text-end">
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
                                        {challenge.teamBPlayers.map((element, index) => (
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
            </div>

        </div>
    )
}

export default TeamB
