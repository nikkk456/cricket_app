import React, { useContext } from 'react'
import { ScoreCardContext } from '../../../context/ScoreCardContext';

const TeamA = ({ setBowler, setStrikerBatsman, setNonStrikerBatsman }) => {
    const { challenge, setChallenge } = useContext(ScoreCardContext);
    return (
        <>
            <div className='row'>
                <h6>Please select striker Batsman</h6>
                <select className="form-select form-select-sm " aria-label="Default select example" name='teamA_selection' onChange={(e) => { setStrikerBatsman(e.target.value); console.log("This is stricker batsman ==========>", e.target.value) }}>
                    <option value="" disabled selected>Select a Batsman</option>
                    {

                        challenge.teamAPlayers.map((element, index) => (
                            <option value={element.value} key={index}>{element.value}</option>
                        ))
                    }
                </select>
            </div>
            <div className='row'>
                <h6>Please select Non-Stricker Batsman</h6>
                <select className="form-select form-select-sm " aria-label="Default select example" name='teamA_selection' onChange={(e) => { setNonStrikerBatsman(e.target.value) }}>
                <option value="" disabled selected>Select a Batsman</option>
                    {
                        challenge.teamAPlayers.map((element, index) => (
                            <option value={element.value} key={index}>{element.value}</option>
                        ))
                    }
                </select>
            </div>
            <div className='row'>
                <h6>Please select Bowler</h6>
                <select className="form-select form-select-sm " aria-label="Default select example" name='teamA_selection' onChange={(e) => { setBowler(e.target.value) }}>
                <option value="" disabled selected>Select a Bowler</option>
                    {
                        challenge.teamBPlayers.map((element, index) => (
                            <option value={element.value} key={index}>{element.value}</option>
                        ))
                    }
                </select>
            </div>
        </>
    )
}

export default TeamA
