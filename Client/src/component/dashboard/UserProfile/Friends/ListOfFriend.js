import React, { useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import MiniUserprofile from './MiniUserprofile'
import { useState } from 'react';
import FriendList from '../../FindFriend/FriendList';
import axiosinstance from '../../../../axios/axiosInstance';

const ListOfFriend = () => {
    const user_id ={"user_id":Cookies.get('user_id')};
    const [ suggestfriends, setSuggestfriend] = useState();
    const [myfriends, setMyFriends] = useState();
    const [friendList, setFriendsList] = useState();
    useEffect(()=>{
        axiosinstance.post("/friends/list",user_id,{
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

    useEffect(()=>{
        axiosinstance.post("/friends/myfriends",user_id,{
            headers:{
                authorization:Cookies.get("uid")
            }
        }).then((response)=>{
           console.log("This is MyFriends",response);
            setMyFriends(response.data.results);
        }).catch((err)=>{
            console.log(err);
        });
    },[]);

    console.log("This is myFrined lustr of array", myfriends);
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
                <div className='col-md-6 friend-list-search'>
                    <h4>Friend List</h4>
                </div>
                <div className='col-md-6 col-12 friend-list-searchBa'>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{width:"75%"}} />
                        <button className="btn btn-dark" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <hr/>
            <div className='row'>
                {
                    myfriends? myfriends.map((data, index)=>{
                       return(
                        <MiniUserprofile name={data.friend_name} playerId={data.cur_user} index={index} imageUrl={data.profilePicture} key={data.friend_id}/>
                       )
                    }):"No Friend Till Now Connect them!"
                }
            </div>
            <hr/>
            <div className='row'>
                <h5>Captains You may know</h5>
                {
                    friendList? friendList.map((data, index)=>{
                        return (
                            <FriendList name={data.name} playerId={data.id} playingStyle={formatPlayingRole(data.playing_role)} index={index} imageUrl={data.profilePicture} key={data.id}/>
                        )
                    }):""
                }
            </div>
        </div>
    )
}

export default ListOfFriend
