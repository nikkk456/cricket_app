import React, { useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import MiniUserprofile from './MiniUserprofile'
import SuggestedFriends from './SuggestedFriends'
import { useState } from 'react';
import FriendList from '../../FindFriend/FriendList';

const ListOfFriend = () => {
    const user_id ={"user_id":Cookies.get('user_id')};
    const [ suggestfriends, setSuggestfriend] = useState();
    const [friendList, setFriendsList] = useState();
    useEffect(()=>{
        axios.post("http://localhost:8080/api/friends/list",user_id,{
            headers:{
                authorization:Cookies.get("uid")
            }
        }).then((response)=>{
            setFriendsList(Object.values(response.data.result));
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
                <h5>Captains You may know</h5>
                {
                    friendList? friendList.map((data, index)=>{
                        return (
                            <FriendList name={data.name} playerId={data.id} playingStyle={formatPlayingRole(data.playing_role)} index={index}/>
                        )
                    }):""
                }
            </div>
        </div>
    )
}

export default ListOfFriend
