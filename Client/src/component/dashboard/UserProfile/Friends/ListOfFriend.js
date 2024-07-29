import React from 'react'
import MiniUserprofile from './MiniUserprofile'
import SuggestedFriends from '../SuggestedFriends'

const ListOfFriend = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 col-6'>
                    <h4>Friend List</h4>
                </div>
                <div className='col-md-6 col-6 d-flex justify-content-end'>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{width:"75%"}} />
                        <button class="btn btn-dark" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <hr/>
            <div className='row'>
                <MiniUserprofile  captain="true"/>
                <MiniUserprofile  captain="true"/>
                <MiniUserprofile  captain="false"/>
                <MiniUserprofile  captain="true"/>
                <MiniUserprofile  captain="false"/>
                <MiniUserprofile  captain="true"/>
                <MiniUserprofile  captain="false"/>
            </div>
            <hr/>
            <div className='row'>
                <h5>Suggested Friends</h5>
                <SuggestedFriends captain="false"/>
                <SuggestedFriends captain="true"/>
                <SuggestedFriends captain="false"/>
                <SuggestedFriends captain="true"/>
            </div>
        </div>
    )
}

export default ListOfFriend
