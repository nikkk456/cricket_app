import React, { useContext, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import SideBar from './SideBar'
import ChatBox from './ChatBox'
import { SocketContext } from '../../../context/SocketContext';
const UserChat = () => {
  const socket = useContext(SocketContext);
  const [inputValue, setInputValue] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [mobileChat, setMobileChat] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    console.log("hii");
    if(socket){
        socket.on("receivestatus",(data)=>{
            alert("recieved");
        });
        socket.on("receiveMessage",(data)=>{
          alert("recieved 1");
      });
    }
},[socket])


  const sendmsgbutton = ()=>{
    if(inputValue.trim()==''){
      return ;
    }
    const message = {
      sender: Cookies.get("user_id"), // Replace with the actual sender
      receiver: selectedFriend.id, // Replace with the actual receiver ID
      messageText: inputValue,
      timestamp: new Date().toISOString()
    };
    console.log(message);
    socket.emit('sendMessage', message);
    setMessages((prevMessages) => [...prevMessages, message]);
    console.log(message);
    setInputValue('');

  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  useEffect(() => {
    const handleMediaQuery = (mediaQueryList) => {
      if (mediaQueryList.matches) {
        setMobileChat(true);
      } else {
        setMobileChat(false);
      }
    }

    const mediaQueryList = window.matchMedia('(max-width: 767px)');
    mediaQueryList.addListener(handleMediaQuery);
    handleMediaQuery(mediaQueryList);

    return () => {
      mediaQueryList.removeListener(handleMediaQuery);
    };
  }, [])
  return (
    <>
      {
        mobileChat ?
          <div className='container-fluid'>
            <div className='row'>
              <div className={`col-12 p-0 ${selectedFriend ? 'd-none d-md-block' : ''}`}>
                <SideBar setSelectedFriend={setSelectedFriend} />
              </div>
              <div className={`col-12 ${selectedFriend ? '' : 'd-none d-md-block'}`}>
                <ChatBox selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} mobileChat={mobileChat} inputValue={inputValue} onInputChange={handleInputChange} onSendmsg={sendmsgbutton} messages={messages} />
              </div>
            </div>
          </div>
          : <div className='container-fluid'>
            <div className='row'>
              <SideBar setSelectedFriend={setSelectedFriend} />
              <ChatBox selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} mobileChat={mobileChat} inputValue={inputValue} onInputChange={handleInputChange} onSendmsg={sendmsgbutton} messages={messages} />
            </div>
          </div>
      }
    </>
  )
}

export default UserChat
