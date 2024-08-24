import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axiosinstance from '../../../axios/axiosInstance';
import NotificationMessage from './NotificationMessage';
import FriendList from '../FindFriend/FriendList';
const Notification = () => {
  const [showLoader, setShowLoader] = useState(true);
  const user_id = { "user_id": Cookies.get('user_id') };
  const [filter, setFilter] = useState('all');
  const [friendList, setFriendsList] = useState();
  const [NotificationList, setNotificationList] = useState();
  
  useEffect(() => {
    axiosinstance.post("/friends/list", user_id, {
      headers: {
        authorization: Cookies.get("uid")
      }
    }).then((response) => {
      setShowLoader(false);
      setFriendsList(Object.values(response.data.result));
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(()=>{
    axiosinstance.post("/notification/list", user_id, {
      headers: {
        authorization: Cookies.get("uid")
      }
    }).then((response) => {
      console.log(response);
        setNotificationList(Object.values(response.data.results));
    }).catch((err) => {
      console.log(err);
    });

  },[]);

  const formatPlayingRole = (role) => {
    switch (role) {
      case "all_rounder":
        return "All Rounder";
      case "wicket_keeper_batsman":
        return "Wicket Keeper Batsman";
      default:
        return role ? role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "----";
    }
  };

  const filterNotifications = () => {
    if (filter === 'all') {
      return NotificationList;
    }
    if (filter === 'myMessages') {
      return NotificationList.filter(data => data.type === 'message');
    }
    if (filter === 'others') {
      return NotificationList.filter(data => data.type !== 'message');
    }
  };
  console.log("This is Notification List", NotificationList)

  return (
    <div className='container-fluid' style={{marginBottom:"55px"}}>
      <div className='row'>
        <div className='col-md-7 ml-2'>
          <div className='row'>
            <h2 className='text-center'>Alerts</h2>
          </div>
          <div className='row' style={{ display: "flex", justifyContent: "space-around" }}>
            <button
              type='button'
              className='btn btn-dark mx-2' style={{width:"20%"}}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              type='button'
              className='btn btn-dark mx-2 notification-btn'
              onClick={() => setFilter('myMessages')}
            >
              My Messages
            </button>
            <button
              type='button'
              className='btn btn-dark mx-2 notification-btn'
              onClick={() => setFilter('others')}
            >
              Others
            </button>
          </div>
          <div className='row mt-4 justify-content-center'>
            <div className='rounded no-scrollbar' style={{ boxShadow: "0px 0px 4px 3px grey", maxHeight: "80vh", overflowY: "auto", width: "95%", height:"70vh" }}>
              {
                NotificationList ? NotificationList.length !==0? NotificationList.map((data) => {
                  return (
                    
                    <NotificationMessage
                      key={data.id}
                      id={data.notification_type}
                      isSeen={data.is_seen}
                      type={data.noti_type}
                      content={data.content}
                      date={data.created_at}
                      sender_id={data.sender_id}
                      sender_name = {data.sender_name}
                      status = {data.status}
                      setNotificationList = {setNotificationList}
                    />
                  );
                }): <div className='d-flex align-items-center justify-content-center ' style={{height:"70vh"}} >
                  <h5>No Notification till Now!</h5>
                </div>:<div className='d-flex align-items-center justify-content-center '  style={{height:"70vh"}}>
                <dotlottie-player src="https://lottie.host/fb5d52f2-d675-4352-a182-ee4e1c88bea9/SpTQ74uC8Z.json" background="transparent" speed="1" style={{ width: "300px", height: "100px" }} loop autoplay></dotlottie-player>
                </div>
              }
            </div>
          </div>
        </div>
        <div className='col-md-1'>

        </div>
        <div className='col-md-4'>
          <div className='row d-flex justify-content-center' >
            <h3 className='mx-1 my-3'>Suggested Captains</h3>
            <div style={{ maxHeight: "50vh", width:"95%", overflowY: "auto", borderRadius: "10px", boxShadow: "0px 0px 6px 1px grey" }} className='no-scrollbar'>
              {
                showLoader ?<dotlottie-player src="https://lottie.host/fb5d52f2-d675-4352-a182-ee4e1c88bea9/SpTQ74uC8Z.json" background="transparent" speed="1" style={{ width: "300px", height: "100px" }} loop autoplay></dotlottie-player>
                :
                friendList.map((data, index) => (
                  <div key={data.id}><FriendList name={data.name} playerId={data.id} playingStyle={formatPlayingRole(data.playing_role)} index={index} imageUrl={data.profilePicture} /></div>
                )) 
              }
            </div>
          </div>
          <div className='row mt-4 d-flex justify-content-center'>
            <div className='rounded p-2' style={{ boxShadow: "0px 0px 6px 1px grey", width:"95%" }}>
              <h4>
                Want to make your Own team ?
              </h4>
              <p>Worry Not we Got You! <br /> Click on the create now button to get started</p>
              <button type='button' className='btn btn-dark'>Create Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
