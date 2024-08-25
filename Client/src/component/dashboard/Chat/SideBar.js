import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import UserChatProfile from './UserChatProfile';
import friendsData from './FriendsData.json';
import teamsData from './TeamData.json';
import axiosinstance from '../../../axios/axiosInstance'
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const SideBar = ({setSelectedFriend,setMessages}) => {
    console.log("setMessages prop:", setMessages); // Should
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [friendslist, setfriendslist] = useState([]);
        useEffect(()=>{
           const user_id ={"user_id":Cookies.get('user_id')};
            axiosinstance.post("/friends/list",user_id,{
                headers:{
                    authorization:Cookies.get("uid")
                }
            }).then((response)=>{
                console.log("This is suggested friend list Data ", response)
                setfriendslist(Object.values(response.data.result));
            }).catch((err)=>{
                console.log(err);
            });
        },[]);


    const filteredFriends = friendsData.filter(friend =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleFriendClick = (friend)=>{
        setMessages([]);
        console.log("The friend is clicked ");
        setSelectedFriend(friend)
        axiosinstance.post("/chats/getchats", {friend_id:friend.id},{
            headers:{
                authorization:Cookies.get("uid"),
                user_id:Cookies.get("user_id")
            }
        }).then((response)=>{
            console.log(response);
            const updatedFriend = { ...friend, chat: response.data };
            setSelectedFriend(updatedFriend);
            console.log(typeof setMessages); // Sh
            setMessages((prevMessages) => [...prevMessages, ...response.data]); // setMessages is used here
            console.log(updatedFriend);
        }).catch((err)=>{
            console.log(err);
        });
    }

    return (
        <div className='vh-100 chat-sidebar'>
            <div className='container-fluid'>
                <div className='row'>
                    <h2>Cricket Chats</h2>
                    <small>Unite.Play.Conquer!</small>
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
                            friendslist.length > 0 ? (
                                friendslist.map((data, index) => (
                                    <div key={index} onClick={() => handleFriendClick(data)}>
                                        <UserChatProfile
                                            captain={data.captain}
                                            name={data.name}
                                            profilepicture={data.profilePicture}
                                            lastMessage={data.chats && data.chats.length > 0 ? data.chats[data.chats.length - 1].message : "Hello"}
                                            lastActive="12:14"
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>No friends available</p>
                            )
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
