import React from 'react'
const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  };

const NotificationMessage = ({ type, content, date, time, isSeen }) => {
    const truncatedContent = truncateContent(content, 7);
    return (
        <div className={isSeen?'row p-2 border-bottom ': 'row p-2 text-white border-bottom'} style={{backgroundColor: isSeen?"":"grey", cursor:"pointer"}}>
            <div className='col-md-10'>
                <div className='row'>
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "10%" }}>
                            <img src="https://github.com/mdo.png" alt="mdo" style={{ width: "100%" }} className="rounded-circle" />
                        </div>
                        <div className='row mx-2'>
                        <h6><b>{type}!</b></h6>
                        <p>{truncatedContent}</p>
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