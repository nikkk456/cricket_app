import React from 'react'
import Headerimage from './Headerimage'
import Profile from './Profile'
import Ministat from './Ministat'

const UserProfile = () => {
  return (
    <div>
      <Headerimage/>
      <div className="container mt-4">
        <Profile />
        <Ministat/>
      </div>
    </div>
  )
}

export default UserProfile
