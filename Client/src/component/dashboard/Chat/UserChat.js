import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import SideBar from './SideBar';
import ChatBox from './ChatBox';
import { SocketContext } from '../../../context/SocketContext';

const UserChat = () => {
  const socket = useContext(SocketContext);
  const [inputValue, setInputValue] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [mobileChat, setMobileChat] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) {
      console.log("Socket is not initialized yet");
      return;
    }

    const userID = Cookies.get("user_id");

    // Emit event to join the chat room when a user selects a friend
    if (selectedFriend) {
      const chatRoom = [userID, selectedFriend.id].sort().join('_');
      socket.emit("joinRoom", { user_id: userID, chat_id: chatRoom });
    }

    // Define event handlers
    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => {
        // Ensure no duplicate messages by checking if the message already exists in state
        const messageExists = prevMessages.some(
          (msg) => msg.timestamp === data.timestamp && msg.sender === data.sender
        );

        return messageExists ? prevMessages : [...prevMessages, data];
      });

      if (data.sender !== userID) {
        alert(`${data.sender}: ${data.messageText}`);
      }
    };

    // Attach event listeners
    socket.on("receiveMessage", handleReceiveMessage);

    // Clean up listeners when the component unmounts or dependencies change
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, selectedFriend]);


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendmsgbutton();
    }
  };

  const sendmsgbutton = () => {
    if (inputValue.trim() === '') {
      return;
    }
    const message = {
      sender: Cookies.get("user_id"),
      receiver: selectedFriend.id,
      messageText: inputValue,
      timestamp: new Date().toISOString(),
    };
    socket.emit('sendMessage', message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setInputValue('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const handleMediaQuery = (mediaQueryList) => {
      setMobileChat(mediaQueryList.matches);
    };

    const mediaQueryList = window.matchMedia('(max-width: 767px)');
    mediaQueryList.addListener(handleMediaQuery);
    handleMediaQuery(mediaQueryList);

    return () => {
      mediaQueryList.removeListener(handleMediaQuery);
    };
  }, []);

  return (
    <>
      {mobileChat ? (
        <div className="container-fluid">
          <div className="row">
            <div className={`col-12 p-0 ${selectedFriend ? 'd-none d-md-block' : ''}`}>
              <SideBar setSelectedFriend={setSelectedFriend} />
            </div>
            <div className={`col-12 ${selectedFriend ? '' : 'd-none d-md-block'}`}>
              <ChatBox
                selectedFriend={selectedFriend}
                setSelectedFriend={setSelectedFriend}
                mobileChat={mobileChat}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onSendmsg={sendmsgbutton}
                messages={messages}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <SideBar setSelectedFriend={setSelectedFriend} />
            <ChatBox
              selectedFriend={selectedFriend}
              setSelectedFriend={setSelectedFriend}
              mobileChat={mobileChat}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              onSendmsg={sendmsgbutton}
              messages={messages}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserChat;
