import React, { useState } from 'react'
import findFriend from './findfriend.json'
import FriendList from './FriendList';
import NoFriend from './NoFriend';

const FindFriend = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFriend, setShowFriend] = useState(false);
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='row' style={{ backgroundColor: "grey" }}>
                        <div className="input-group my-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Friend's username"
                                aria-label="Friend's username"
                                aria-describedby="basic-addon2"
                                style={{ borderRadius: "10px 0px 0px 10px" }}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            <span className="input-group-text" id="basic-addon2" style={{ borderRadius: "0px 10px 10px 0px" }} onClick={() => { setShowFriend(true) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    {
                        showFriend ?
                            <div className='row'>
                                <div className='no-scrollbar' style={{ overflowY: "auto", maxHeight: "90vh" }}>
                                    {
                                        findFriend.map((data, index) => (
                                            <FriendList name={data.name} playingStyle={data.playingStyle} imageUrl={data.profilePicture} />
                                        ))
                                    }
                                </div>
                            </div>
                            :
                            <div className='row p-2 ' style={{ display: "felx", justifyContent: "center", alignItems: "center", height: "85vh", borderRight: "1px solid black" }}>
                                <div>
                                    <h3>Search Friend Nearby You</h3>
                                    <p>Start Searching your friend by Name or by friend's Unique ID <br /> It's better to play together</p>
                                </div>
                            </div>
                            // <NoFriend/>
                    }
                </div>
                <div className='col-md-1'>

                </div>
                <div className='col-md-5'>
                    <div className='row rounded border mt-2'>
                        <h5>Suggested Friends</h5>
                        <div className='no-scrollbar' style={{ overflowY: "auto", maxHeight: "90vh" }}>
                            {
                                findFriend.map((data, index) => (
                                    <FriendList name={data.name} playingStyle={data.playingStyle} imageUrl={data.profilePicture} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindFriend
