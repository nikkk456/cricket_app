import React, { useState } from 'react';
import notification from './Notification.json';
import NotificationMessage from './NotificationMessage';
import SuggestedFriend from './SuggestedFriend';

const Notification = () => {
  const [filter, setFilter] = useState('all');
  const arr = [1,2,3,4,55,6,6,7];

  const filterNotifications = () => {
    if (filter === 'all') {
      return notification;
    }
    if (filter === 'myMessages') {
      return notification.filter(data => data.type === 'message');
    }
    if (filter === 'others') {
      return notification.filter(data => data.type !== 'message');
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-7 ml-2'>
          <div className='row'>
            <h2 className='text-center'>Alerts</h2>
          </div>
          <div className='row' style={{ display: "flex", justifyContent: "space-around" }}>
            <button
              type='button'
              className='btn btn-dark mx-2'
              style={{ width: "20%" }}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              type='button'
              className='btn btn-dark mx-2'
              style={{ width: "20%" }}
              onClick={() => setFilter('myMessages')}
            >
              My Messages
            </button>
            <button
              type='button'
              className='btn btn-dark mx-2'
              style={{ width: "20%" }}
              onClick={() => setFilter('others')}
            >
              Others
            </button>
          </div>
          <div className='row mt-4 justify-content-center'>
            <div className='rounded no-scrollbar' style={{ boxShadow: "0px 0px 4px 3px grey", maxHeight: "80vh", overflowY: "auto", width:"95%" }}>
              {
                filterNotifications().map((data) => {
                  return (
                    <NotificationMessage
                      key={data.id}
                      isSeen={data.isSeen}
                      type={data.type}
                      content={data.content}
                      date={data.date}
                      time={data.time}
                    />
                  );
                })
              }
            </div>
          </div>
        </div>
        <div className='col-md-1'>

        </div>
        <div className='col-md-4'>
          <div className='row'>
            <h3 className='mx-1'>Suggested Captains</h3>
            <div style={{maxHeight:"50vh", overflowY:"auto", borderRadius:"10px", boxShadow:"0px 0px 6px 1px grey"}} className='no-scrollbar'>
              {
                arr.map((data)=>(
                  <><SuggestedFriend/></>
                ))
              }
            </div>
          </div>
          <div className='row mt-4'>
            <div className='rounded p-2' style={{boxShadow:"0px 0px 6px 1px grey"}}>
              <h4>
                Want to make your Own team ?
              </h4>
              <p>Worry Not we Got You! <br/> Click on the create now button to get started</p>
              <button type='button' className='btn btn-dark'>Create Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
