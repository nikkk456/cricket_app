import React from 'react';
import "./notification.css";
import Cookies from 'js-cookie';
import axios from 'axios';
const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
};


const NotificationMessage = ({ type, content, date, time, isSeen, id , sender_id , sender_name , status}) => {
    const truncatedContent = truncateContent(content, 7);
    const accept_request = ()=>{
        const values = {user_id : Cookies.get("user_id"),sender_id:sender_id};
        axios.post("http://localhost:8080/api/notification/accept_request", values, {
            headers: {
              authorization: Cookies.get("uid")
            }
          }).then((response) => {
            console.log(response);
            if(response.data.results[0].status == 1){
                alert("happy connect !");
            }
          }).catch((err) => {
            console.log(err);
          });
    }
    const decline_request = ()=>{

    }

    return (
        <div className={`notification-item ${isSeen ? 'seen' : 'unseen'}`}>
            <div className="notification-content">
                <div className="notification-icon">
                    <img src="https://github.com/mdo.png" alt="Profile" className="notification-avatar" />
                </div>
                <div className="notification-text">
                    <h6 className="notification-type"><b>{type}!</b></h6>
                    <p className="notification-message">{truncatedContent} {sender_name}</p>
                    {status==0 ? (
                        <div className="notification-actions">
                            <button className="btn btn-success btn-sm mx-1" onClick={accept_request}>Accept</button>
                            <button className="btn btn-danger btn-sm" onClick={decline_request}>Decline</button>
                        </div>
                    ):''}
                </div>
            </div>
            <div className="notification-time">
                <small>{date}</small>
                <small style={{ fontSize: "x-small" }}>{time}</small>
            </div>
        </div>
    );
};

export default NotificationMessage;
