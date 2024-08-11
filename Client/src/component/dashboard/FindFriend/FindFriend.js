import React, { useEffect, useState } from 'react'
import FriendList from './FriendList';
import Cookies from 'js-cookie';
import axios from 'axios';
import CricketLoader from '../../loader/CricketLoader.js';

const FindFriend = () => {
    const user_id ={"user_id":Cookies.get('user_id')};
    const [searchValue,setSearchValue] = useState({});
    const [friendslist,setfriendslist ]= useState([]);
    const [searchfrien ,setsearchfrien] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFriend, setShowFriend] = useState(false);
    const [suggestfriend,setSuggestfriend] = useState(false);
    
    useEffect(()=>{
        axios.post("http://localhost:8080/api/friends/list",user_id,{
            headers:{
                authorization:Cookies.get("uid")
            }
        }).then((response)=>{
            setfriendslist(Object.values(response.data.result));
            setSuggestfriend(true);
        }).catch((err)=>{
            console.log(err);
        });
    },[]);
    const formatPlayingRole = (role) => {
        switch(role) {
            case "all_rounder":
                return "All Rounder";
            case "wicket_keeper_batsman":
                return "Wicket Keeper Batsman";
            default:
                return role ? role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "----";
        }
    };

    const searchfriend = (e)=>{
        setSearchValue({...searchValue,[e.target.name]:e.target.value});
        console.log(searchValue);
        axios.post("http://localhost:8080/api/friends/searchfriends",searchValue, {
            headers: {
                "userId": Cookies.get('user_id')
            }
        } ).then((response)=>{
            setsearchfrien(Object.values(response.data.result));
            setShowFriend(true);
        }).catch((err)=>{
            console.log(err);
        });
    }
    
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='row' style={{ backgroundColor: "grey" }}>
                        <div className="input-group my-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Friend's username"
                                aria-label="Friend's username"
                                aria-describedby="basic-addon2"
                                style={{ borderRadius: "10px 0px 0px 10px" }}
                                name='searchvalue'
                                onChange={searchfriend}
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
                                        searchfrien.map((data, index) => (
                                            <FriendList name={data.name} playerId={data.id} playingStyle={formatPlayingRole(data.playing_role)} index={index} key={data.id} imageUrl={data.profilePicture}/>
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
                <div className='col-md-4'>
                   <div className="row pt-4 pb-2" >
                        <h5 className='mb-2' >Suggested Friends</h5>
                        </div>
                        { suggestfriend?
                        <div className='no-scrollbar mt-2' style={{ overflowY: "auto", maxHeight: "90vh" }}>
                            { 
                                friendslist.map((data, index) => (
                                    <FriendList name={data.name} playerId={data.id} playingStyle={formatPlayingRole(data.playing_role)} index={index} key={data.id} imageUrl={data.profilePicture}/>
                                ))
                            }
                        </div>:
                        <div className='col-md-4' style={{position: 'absolute',width: '-webkit-fill-available', display: 'flex',justifyContent: 'center',top: '50%',transform: 'translateY(-50%)'}}>
                        <CricketLoader/>
                        </div>
                        }   
                </div>
            </div>
        </div>
    )
}

export default FindFriend
