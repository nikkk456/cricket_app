import React, { useState } from 'react'
import SideBar from './SideBar'
import ChatBox from './ChatBox'

const UserChat = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  return (
    <div className='container-fluid'>
      <div className='row'>
      <SideBar setSelectedFriend={setSelectedFriend}/>
      <ChatBox selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend}/>
      </div>
    </div>
  )
}

export default UserChat
