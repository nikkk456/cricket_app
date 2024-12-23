import React from 'react'
import TopTeamCard from './TopTeamCard'

const TopCricketTeam = () => {
    return (
        <div className='container'>
            <div className='row my-3'>
                <h3 className='playfair-display-sc-bold'>Our Top Teams</h3>
            </div>
            <div className='row no-scrollbar top-team-row'>
                <div className='col-md-4' style={{display:"flex", justifyContent:"center"}}>
                    <TopTeamCard Team_Name="Nikhil Ki Team " Team_Rank="1"  />    
                </div>
                <div className='col-md-4' style={{display:"flex", justifyContent:"center"}}>
                    <TopTeamCard Team_Name="Rahul ki Team" Team_Rank="2" />
                </div>
                <div className='col-md-4' style={{display:"flex", justifyContent:"center"}}>
                    <TopTeamCard Team_Name="Sumit Ki Team" Team_Rank="3" />
                </div>
            </div>
        </div>
    )
}

export default TopCricketTeam
