import React from 'react'
import RecentMatch from './RecentMatch'
import LeaderBoard from './LeaderBoard'

const HomePage = () => {
    const arr = ['1','2','3','4','5'];
    return (
        <div className='container'>
            <div className='row' style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "20vh" }}>
                <h2 className='playfair-display-sc-bold'>Welcome to CricFight ScoreCard</h2>
            </div>
            <div className='row'>
                <div className='col-md-8' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3>Ready, Set, Score! Ignite Rivalries and Dominate the Field!</h3>
                    <p>Step onto the pitch, challenge your fiercest rivals, and let the scorecard tell the tale of your triumphs. Every match is a new battle—make every run count and lead your team to victory!</p>
                    <div><button className='btn btn-dark mx-2'>
                        Betting Match
                    </button>
                    <button className='btn btn-dark mx-2'>
                        Friendly Match
                    </button></div>
                </div>
                <div className='col-md-4'>
                    <img src='./Image/scorecardhome.png' alt='cricket-image' className='img-fluid' style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70% ", boxShadow: "0px 0px 9px 3px grey" }} />
                </div>
            </div>
            <div className='row mt-2'>
                <h4>Your Recent Matches</h4>
            </div>
            <div className='row no-scrollbar' style={{overflowX:"auto", flexWrap:"nowrap"}}>
                <RecentMatch/>
                <RecentMatch/>
                <RecentMatch/>
                <RecentMatch/>
                <RecentMatch/>
                <RecentMatch/>
                <RecentMatch/>
                <RecentMatch/>
                <RecentMatch/>
                <RecentMatch/>
            </div>
            <div className='row mt-2'>
                <h4>Current LeaderBoard</h4>
            </div>
            <div className='row mt-2'>
                {
                    arr.map((data, index)=>(
                        <LeaderBoard index={index}/>
                    ))
                }
            </div>
        </div>
    )
}

export default HomePage
