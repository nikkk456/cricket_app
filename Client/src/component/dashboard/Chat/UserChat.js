import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import ChatBox from './ChatBox'

const UserChat = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [mobileChat, setMobileChat] = useState(false);
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
                <ChatBox selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} mobileChat={mobileChat} />
              </div>
            </div>
          </div>
          : <div className='container-fluid'>
            <div className='row'>
              <SideBar setSelectedFriend={setSelectedFriend} />
              <ChatBox selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} mobileChat={mobileChat}  />
            </div>
          </div>
      }
    </>
  )
}

export default UserChat
