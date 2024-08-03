import React from 'react'

const NotificationMessage = ({ type, content, date, time, isSeen }) => {
    return (
        <div className={isSeen?'row p-2 border-bottom': 'row p-2 text-white border-bottom'} style={{backgroundColor: isSeen?"":"grey"}}>
            <div className='col-md-10'>
                <div className='row'>
                    <div style={{ display: "flex" }}>
                        <img src="https://github.com/mdo.png" alt="mdo" style={{ width: "10%" }} className="rounded-circle" />
                        <div className='row mx-2'>
                        <h6><b>{type}!</b></h6>
                        <p>{content}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-2'>
                <div className='row'>
                    <small>
                        {date}
                    </small>
                    <small style={{ fontSize: "x-small" }}>{time}</small>
                </div>
            </div>
        </div>
    )
}

export default NotificationMessage
