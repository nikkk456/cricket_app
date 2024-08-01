import React from 'react'
import SideBar from './SideBar'
import ChatBox from './ChatBox'

const UserChat = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
      <SideBar/>
      <ChatBox/>
      </div>
    </div>
  )
}

export default UserChat
