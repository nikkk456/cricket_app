import React, { useContext, useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import UserChatProfile from './UserChatProfile';
// import teamsData from './TeamData.json';
import axiosinstance from '../../../axios/axiosInstance'
import Cookies from 'js-cookie';
import { SocketContext } from '../../../context/SocketContext';

const SideBar = ({ setSelectedFriend, setMessages }) => {
    // const user_id = Cookies.get("user_id");
    const socket = useContext(SocketContext);
    const location = useLocation();
    const [teamsData, setTeamsdata] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [friendslist, setfriendslist] = useState([]);
    const [isCreatingTeam, setIsCreatingTeam] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [selectedFriends, setSelectedFriends] = useState([]);
    const user_id = { "user_id": Cookies.get('user_id') };

    useEffect(() => {
        if (!socket) {
            console.log("Socket is not initialized yet");
        }

        axiosinstance.post("/friends/list", user_id, {
            headers: {
                authorization: Cookies.get("uid")
            }
        }).then((response) => {
            setfriendslist(Object.values(response.data.result));
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        axiosinstance.post("/groups/groupslist", user_id, {
            headers: {
                authorization: Cookies.get("uid")
            }
        }).then((response) => {
            console.log(response);
            setTeamsdata(Object.values(response.data.result));
        }).catch((err) => {
            console.log(err);
        });
    }, [selectedFriends]);

    const filteredFriends = friendslist.filter(friend =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleFriendClick = (friend) => {
        setMessages([]);
        setSelectedFriend(friend);
        if (!friend.room_id) {
            axiosinstance.post("/chats/getchats", { friend_id: friend.id }, {
                headers: {
                    authorization: Cookies.get("uid"),
                    user_id: Cookies.get("user_id")
                }
            }).then((response) => {
                const updatedFriend = { ...friend, chat: response.data };
                setSelectedFriend(updatedFriend);
                setMessages((prevMessages) => [...prevMessages, ...response.data]);
            }).catch((err) => {
                console.log(err);
            });
        } else {
            axiosinstance.post("/chats/roomchats", { room_id: friend.room_id }, {
                headers: {
                    authorization: Cookies.get("uid"),
                    user_id: Cookies.get("user_id")
                }
            }).then((response) => {
                const updatedFriend = { ...friend, chat: response.data };
                setSelectedFriend(updatedFriend);
                setMessages((prevMessages) => [...prevMessages, ...response.data]);
            }).catch((err) => {
                console.log(err);
            });
        }
    };

    const handleCreateTeam = () => {
        setIsCreatingTeam(!isCreatingTeam);
    };

    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };

    const handleFriendSelection = (friendId) => {
        setSelectedFriends(prevSelectedFriends =>
            prevSelectedFriends.includes(friendId)
                ? prevSelectedFriends.filter(id => id !== friendId)
                : [...prevSelectedFriends, friendId]
        );
    };

    const handleSubmitTeam = () => {
        const newTeam = {
            name: teamName,
            members: selectedFriends,
        };
        console.log(newTeam);
        // Send request to create a room and invite friends
        socket.emit('createRoom', {
            teamName: newTeam.name,
            selectedFriends: newTeam.members,
            created_by: Cookies.get("user_id")
        }, (roomId) => {
            console.log('Room created with ID:', roomId);
            // Optionally, you can navigate to the room chat or update the UI
        });



        // Add your API call here to save the new team.
        setIsCreatingTeam(false);
        setTeamName('');
        setSelectedFriends([]);
    };

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
                <div className='row justify-content-center'>
                    <div className='col-auto'>
                        <ul className="nav nav-underline">
                            <li className="nav-item mx-2">
                                <Link className={location.pathname.includes("/friendschat") ? "nav-link active" : "nav-link"} to="friendschat">Friends</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className={location.pathname.includes("/teamschat") ? "nav-link active" : "nav-link"} to="teamschat">Teams</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <Routes>
                    <Route path='friendschat' element={
                        <div className='chat-list mt-3 no-scrollbar d-flex flex-column' style={{ minHeight: "30vh", maxHeight: "60vh", overflowY: "auto" }}>
                            {
                                filteredFriends.length > 0 ? (
                                    filteredFriends.map((data, index) => (
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
                            {filteredFriends.length < 3 && <div className='flex-grow-1'></div>} {/* Pushes content to the top */}
                        </div>
                    } />
                    <Route path='teamschat' element={
                        <div className="team-container position-relative" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                            {/* Scrollable Content */}
                            <div
                                className="row chat-list no-scrollbar"
                                style={{ flex: "1 1 auto", overflowY: "auto", maxHeight: "60vh" }}
                            >
                                {teamsData.slice().reverse().map((data, index) => (
                                    <div key={index} onClick={() => handleFriendClick(data)}>
                                        <UserChatProfile name={data.team_name} lastMessage={data.lastMessage} lastActive="12:14" />
                                    </div>
                                ))}
                            </div>

                            {/* Team Creation Form */}
                            {isCreatingTeam && (
                                <div
                                    className="team-creation-form bg-white p-3 shadow rounded no-scrollbar"
                                    style={{
                                        position: "absolute",
                                        width: "fit-content",
                                        bottom: "60px", // Place above the button
                                        right: "10px",
                                        zIndex: "10",
                                        borderTop: "1px solid #ddd",
                                    }}
                                >
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        placeholder="Enter Team Name"
                                        value={teamName}
                                        onChange={handleTeamNameChange}
                                    />
                                    <div className="friends-list no-scrollbar" style={{ maxHeight: "200px", overflowY: "auto", }}>
                                        {/* {filteredFriends.map(friend => (
                                            <div key={friend.id} className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={friend.id}
                                                    id={`friend-${friend.id}`}
                                                    checked={selectedFriends.includes(friend.id)}
                                                    onChange={() => handleFriendSelection(friend.id)}
                                                />
                                                <label className="form-check-label" htmlFor={`friend-${friend.id}`}>
                                                    {friend.name}
                                                </label>
                                            </div>
                                        ))} */}
                                        {filteredFriends.map(friend => (
                                            <div
                                                key={friend.id}
                                                className={`user-chat-profile d-flex align-items-center my-2 p-2 ${selectedFriends.includes(friend.id) ? 'selected' : ''}`}
                                                onClick={() => handleFriendSelection(friend.id)}
                                                style={{ cursor: "pointer", border: selectedFriends.includes(friend.id) ? "2px solid #0d6efd" : "1px solid #ccc", borderRadius: "8px" }}
                                            >
                                                <div className='me-2'>
                                                    <img
                                                        src={friend.profilePicture || "https://github.com/mdo.png"}
                                                        className='profile-picture'
                                                        alt='Profile'
                                                        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                    />
                                                </div>
                                                <div className='profile-details flex-grow-1'>
                                                    <p style={{ margin: "0px" }}>
                                                        <strong>{friend.name}</strong>
                                                    </p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input ms-2"
                                                    checked={selectedFriends.includes(friend.id)}
                                                    readOnly
                                                    style={{ marginLeft: "auto" }}
                                                />
                                            </div>
                                        ))}

                                    </div>
                                    <button className="btn btn-primary btn-sm mt-3 w-100" onClick={handleSubmitTeam}>Create Team</button>
                                </div>
                            )}

                            {/* Sticky Button */}
                            <button
                                className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                    position: "absolute",
                                    bottom: "10px", // Position 10px from the bottom
                                    right: "10px",  // Position 10px from the right
                                    width: "50px",
                                    height: "50px",
                                    zIndex: "10",   // Ensure it appears above other elements
                                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                }}
                                onClick={handleCreateTeam}
                            >
                                {isCreatingTeam ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>}
                            </button>
                        </div>
                    } />
                </Routes>

            </div>
        </div>
    );
}

export default SideBar;
