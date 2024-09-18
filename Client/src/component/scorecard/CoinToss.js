import React, { useState } from 'react';
import coinSound from './coin-flip-sound.mp3'; // Add your sound file here
import { useParams } from 'react-router-dom';

const CoinToss = () => {
    const { teamA, teamB,overs } = useParams();
    const [teamAselection, setTeamASelection] = useState();
    const [teamBselection, setTeamBSelection] = useState();
    const [winner, setWinner] = useState();
    const [winnerSelection, setWinnerSelection] = useState();
    const [tossResult, setTossResult] = useState('Heads');
    const [isFlipping, setIsFlipping] = useState(false);

    // Function to handle coin toss
    const handleToss = () => {
        if (!teamAselection || !teamBselection) {
            alert("Please make a call for Toss!");
        }
        else if (teamAselection === teamBselection) {
            alert("Both team call same for toss!")
        } else {
            const coinAudio = new Audio(coinSound);
            coinAudio.play();
            setIsFlipping(true);

            setTimeout(() => {
                const result = Math.random() > 0.5 ? 'Heads' : 'Tails';
                setTossResult(result);
                setIsFlipping(false);
                if (result == teamAselection) {
                    setWinner(teamA);
                }
                else {
                    setWinner(teamB);
                }
            }, 2000); // 2 seconds for animation
        }
    };

    return (
        <div className='container mt-5 vh-100'>
            {
                winner ?
                    <center>
                        <div className="card" style={{width: "19rem", height:"460px", padding:"10px"}}>
                            <img src="/Image/celebration.png" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">Congratulations !!!</h4>
                                <p className="card-text">{teamA} won the Toss</p>
                                <select className="form-select form-select-sm " aria-label="Default select example" name='teamA_selection' onChange={(e) => { setWinnerSelection(e.target.value) }}>
                                    <option value="">Choose Next Step</option>
                                    <option value="Batting" >Batting</option>
                                    <option value="Bowling">Bowling</option>
                                </select>
                                <a href={`/scorecard/${teamA}/vs/${teamB}/${winner}/${overs}/scoreUpdate`} className="btn btn-dark btn-sm mt-2">Start Match</a>
                            </div>
                        </div>
                    </center>
                    :
                    <div>
                        <div className='row my-4 text-center'>
                            <h3>Flip the coin, feel the thrill, and let the match begin! Victory starts with the toss!</h3>
                            <p>The CricFight toss is more than a flip—it's your moment to embrace fair play and excitement! With every spin, the thrill of competition rises, where respect and skill lead the way. Ready for the toss? Let CricFight set the stage for an epic battle!</p>
                        </div>
                        <div className='row text-center'>
                            <div className='col-md-5 col-5'>
                                <h5>{teamA} Selection</h5>
                                <center>
                                    <select className="form-select form-select-sm coin_selection" aria-label="Default select example" name='teamA_selection' onChange={(e) => { setTeamASelection(e.target.value) }}>
                                        <option value="">Call Your Toss</option>
                                        <option value="Heads" >Heads</option>
                                        <option value="Tails">Tails</option>
                                    </select>
                                </center>
                            </div>
                            <div className='col-md-2 col-2'>
                                <h2>V/S</h2>
                            </div>
                            <div className='col-md-5 col-5'>
                                <h5>{teamB} Selection</h5>
                                <center>
                                    <select className="form-select form-select-sm coin_selection" aria-label="Default select example" name='teamB_selection' onChange={(e) => { setTeamBSelection(e.target.value) }}>
                                        <option value="">Call Your Toss</option>
                                        <option value="Heads" >Heads</option>
                                        <option value="Tails">Tails</option>
                                    </select>
                                </center>
                            </div>
                        </div>
                        <div className='row'>
                            <div className={`mt-4 coin anton-regular ${isFlipping ? 'flipping' : ''}`}>
                                {isFlipping ? '' : tossResult}
                            </div>
                        </div>
                        <center className='mt-3'>
                            <button className='btn btn-dark btn-sm' onClick={handleToss} disabled={isFlipping}>
                                Toss Coin
                            </button>
                        </center>
                    </div>
            }
        </div >
    );
};

export default CoinToss;
