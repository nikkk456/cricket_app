import React, { useEffect, useRef } from 'react'

const ChatBox = ({ selectedFriend }) => {
  const chatContainerRef = useRef(null);
  useEffect(() => {
    //To get recent messages on screen and then scroll up for older chats
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [selectedFriend]);
  if (!selectedFriend) {
    return <div className='vh-100' style={{ width: "65%" }}>Please select a friend to start chatting.</div>;
  }

  const { name, chats } = selectedFriend;
  return (
    <div className='vh-100' style={{ width: "65%" }}>
      <div className='row text-white' style={{ backgroundColor: "rgb(92 92 93)", height: "10%" }}>
        <div className='col-md-4 rounded-circle' style={{ width: "9%", display: "flex", alignItems: "center" }}>
          <img src="https://github.com/mdo.png" className='rounded-circle me-2' alt='...' style={{ width: "100%" }} />
        </div>
        <div className='col-md-6' style={{ display: "flex", alignItems: "center" }}>
          <h5>{name}</h5>
        </div>
        <div className='col-md-1' style={{width:"40%", display:"flex", justifyContent:"end", alignItems:"center"}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </div>
      </div>
      <div className='row'>
        <div className="chat-box no-scrollbar" ref={chatContainerRef}>
          {chats.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'Nikhil' ? 'left' : 'right'}`}>
              {
                msg.sender === 'Nikhil' ? <>
                  <span style={{ display: "flex", alignItems: "flex-start" }}>
                    <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path>
                    </svg>
                  </span>
                  <div className="message-content-left">
                    <p style={{ margin: "0px" }}>{msg.message}</p>
                    <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                  </div>
                </> : <>
                  <div className="message-content-right">
                    <p style={{ margin: "0px" }}>{msg.message}</p>
                    <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                  </div>
                  <span style={{ display: "flex", alignItems: "flex-start" }}>
                    <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
                  </span>
                </>
              }
            </div>
          ))}
        </div>
      </div>

      {/* Footer of chatBox  */}
      <div className='row' style={{ backgroundColor: "rgb(92 92 93)" }}>
        <div className='col-md-1' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16" style={{ fill: "white" }}>
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
          </svg>

        </div>
        <div className='col-md-10 my-2'>
          <input type="text" class="form-control " id="message" style={{ borderRadius: "10px" }} aria-describedby="emailHelp" placeholder='Type a message' />
        </div>
        <div className='col-md-1' style={{ display: "flex", alignItems: "center" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16" style={{ fill: "white" }}>
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ChatBox
