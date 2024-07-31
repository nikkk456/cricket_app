import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import UserChatProfile from './UserChatProfile';
import friendsData from './FriendsData.json';
import teamsData from './TeamData.json'

const SideBar = () => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFriends = friendsData.filter(friend =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ width: "30%", backgroundColor: "#f0f0f0", padding: "20px" }} className='vh-100'>
            <div className='container-fluid'>
                <div className='row'>
                    <h1>Cricket Chats</h1>
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
                        <span className="input-group-text" id="basic-addon2" style={{ borderRadius: "0px 10px 10px 0px" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div className='row justify-content-center '>
                    <div className='col-auto'>
                        <ul className="nav nav-underline">
                            <li className="nav-item mx-2">
                                <Link className={location.pathname.includes("/friendschat")?"nav-link active":"nav-link"} to="friendschat">Friends</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className={location.pathname.includes("/teamschat")?"nav-link active":"nav-link"} to="teamschat">Teams</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <Routes>
                    <Route path='friendschat' element={
                        <div className='row chat-list mt-3 no-scrollbar' style={{ height: "60vh", overflowY: "scroll" }}>
                        {
                            filteredFriends.map((data, index) => (
                                <div className=''>
                                    <UserChatProfile captain={data.captain} name={data.name} key={index} lastMessage={data.lastMessage} lastActive="12:14" />
                                </div>
                            ))
                        }
                    </div>
                } />
                <Route path='teamschat' element={
                    <div className='row chat-list mt-3 no-scrollbar' style={{ maxHeight: "60vh", overflowY: "scroll" }}>
                        {
                            teamsData.map((data, index)=>(
                                <div className=''>
                                    <UserChatProfile name={data.name} key={index} lastMessage={data.lastMessage} lastActive="12:14" />
                                </div>
                            ))
                        }
                    </div>
                }/>
                </Routes>

            </div>
        </div>
    );
}

export default SideBar;
