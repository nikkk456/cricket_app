import React from 'react'
import { Link, Route, useLocation, useParams, Routes } from 'react-router-dom';
import TeamA_scorecard from './TeamA_scorecard';
import TeamB_scorecard from './TeamB_scorecard';

const Score_Card = () => {
    const location = useLocation();
    const { teamA, teamB, overs, tossWinner } = useParams();
    return (
        <div className='container'>
            <div className='row'>
                <div className='row justify-content-center my-3'>
                    <div className='col-auto'>
                        <ul className="nav nav-underline">
                            <li className="nav-item mx-2">
                                <Link className={location.pathname.includes('/teamA') ? "nav-link active" : 'nav-link'} to="teamA">{teamA}</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className={location.pathname.includes('/teamB') ? "nav-link active" : 'nav-link'} to="teamB">{teamB}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='row'>
                <Routes>
                    <Route path='teamA' element={<TeamA_scorecard/>}/>
                    <Route path='teamB' element={<TeamB_scorecard/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Score_Card
