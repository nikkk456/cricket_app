import React, { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Link, useNavigate } from 'react-router-dom';


const ChatBox = ({ selectedFriend, setSelectedFriend, mobileChat ,onSendmsg,inputValue, onInputChange ,messages , onKeyDown}) => {
  console.log(messages);
  // console.log(selectedFriend.id);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();
  const scrollUp = ()=>{
    console.log("Scroll Up is called");
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }
  const handleKeyDown = (e) => {
    onKeyDown(e); // Call the existing onKeyDown function
      scrollUp(); // Scroll up after handling the key down event
  };
  useEffect(() => {
    //To get recent messages on screen and then scroll up for older chats
    scrollUp();
  }, [selectedFriend]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // 
  const onEmojiClick = (emojiObject) => {
    console.log(emojiObject);
    // setInputValue((prevInput) => prevInput + emojiObject.emoji); // Hide emoji picker after selecting an emoji
  };

  // If No body is selected for Chat 
  if (!selectedFriend) {
    return <div className='vh-100 row justify-content-center align-items-center' style={{ width: "65%" }}>
      <div className='col-auto'>
        <h1>Welcome to Cricket_App</h1>
        <h4>Unite.Play.Conquer!</h4>
        <p>Click on any friend to start conversation.</p>
      </div>
    </div>;
  }

  const { name = '', chats = [] } = selectedFriend || {};
  const handleDeleteChat = () => {
    setSelectedFriend({ ...selectedFriend, chats: [] });
  }
  return (
    <div className='vh-100 chat-chatbox'>
      {/* Username and info Header  */}
      <div className='row text-white chat-box-header'>
        {
          mobileChat &&
            <div className='col-1 p-0' style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16" onClick={()=>{setSelectedFriend(null)}}>
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
              </svg>
            </div> 
        }
        <div className='col-md-4 col-4 rounded-circle chat-profile'>
          <img src="https://github.com/mdo.png" className='rounded-circle me-2' alt='...' style={{ width: "100%" }} />
        </div>
        <div className='col-md-6 col-6' style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => { navigate('/playerprofile/1/about') }}>
          <h5>{name}</h5>
        </div>
        <div className='col-md-1 chat-triple-dot'>
          <div className="dropdown">
            <a href="#" className="d-flex align-items-center justify-content-center align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16" style={{ fill: "white", cursor: "pointer" }}>
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
            </a>
            <ul className="dropdown-menu text-small shadow">
              <li><Link className="dropdown-item" to="/playerprofile/1/about">View Profile</Link></li>
              <li><a className="dropdown-item" href="#" onClick={handleDeleteChat}>Clear Chat</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Report User</a></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Chat BOX started Here  */}
      <div className='row'>
        <div className="chat-box no-scrollbar" ref={chatContainerRef}>
          {messages.length != 0 ? messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender == selectedFriend.id ? 'left' : 'right'}`}>
              {
                msg.sender == selectedFriend.id ? <>
                  <span style={{ display: "flex", alignItems: "flex-start" }}>
                    <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path>
                    </svg>
                  </span>
                  <div className="message-content-left">
                    <p style={{ margin: "0px" }}>{msg.messageText}</p>
                    <small style={{ fontSize: "x-small" }}>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                  </div>
                </> : <>
                  <div className="message-content-right">
                    <p style={{ margin: "0px" }}>{msg.messageText}</p>
                    <small style={{ fontSize: "x-small" }}>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                  </div>
                  <span style={{ display: "flex", alignItems: "flex-start" }}>
                    <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
                  </span>
                </>
              }
            </div>
             )) : <div className='h-100 d-flex justify-content-center align-items-center' style={{ marginTop: "-90px" }}>
            <p>Start the conversation...</p>
              </div>}
        </div>
      </div>

      {/* Footer of chatBox  */}
      <div className='row chat-box-footer ' style={{ backgroundColor: "rgb(92 92 93)" }}>
        <div className='col-md-1 col-1 chat-emoji'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-emoji-smile"
            viewBox="0 0 16 16"
            style={{ fill: "white", cursor: "pointer" }}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
          </svg>
          {showEmojiPicker && (
            <div style={{ position: 'absolute', bottom: '100%', left: '0', marginBottom: '10px' }}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <div className='col-md-10 col-10 my-2'>
          <input
            type="text"
            className="form-control"
            id="message"
            style={{ borderRadius: "10px" }}
            aria-describedby="emailHelp"
            placeholder='Type a message'
            value={inputValue} // Use value from props
            onChange={onInputChange} // Handle input changes
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className='col-md-1 col-1 chat-send'>
          <svg onClick={onSendmsg} viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="currentColor" style={{ fill: "white" }} version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24">
            <title>send</title>
            <path d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ChatBox
