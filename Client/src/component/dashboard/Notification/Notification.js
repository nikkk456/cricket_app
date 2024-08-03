import React from 'react'
import notification from './Notification.json'
import NotificationMessage from './NotificationMessage'

const Notification = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-8'>
          <div className='row'>
            <h2 className='text-center'>Alerts</h2>
          </div>
          <div className='row' style={{display:"flex", justifyContent:"space-around"}}>
              <button type='button' className='btn btn-dark mx-2' style={{width:"20%"}}>
                All
              </button>
              <button type='button' className='btn btn-dark mx-2' style={{width:"20%"}}>
                My message
              </button>
              <button type='button' className='btn btn-dark mx-2' style={{width:"20%"}}>
                Others
              </button>
          </div>
          <div className='row mt-4'>
            <div className='col-auto rounded no-scrollbar' style={{boxShadow:"0px 0px 4px 3px grey", maxHeight:"80vh", overflowY:"auto"}}>
              {
                notification.map((data)=>{
                  return (
                    <NotificationMessage isSeen={data.isSeen}  type={data.type} content={data.content} date={data.date} time={data.time}/>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification
