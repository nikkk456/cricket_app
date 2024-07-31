import React from 'react'
import SideBar from './SideBar'
import ChatBox from './ChatBox'

const UserChat = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
      <SideBar/>
      <div className='col-md-8'>
        <h1>Hello</h1>
        <ChatBox/>
      </div>
      </div>
    </div>
  )
}

export default UserChat
