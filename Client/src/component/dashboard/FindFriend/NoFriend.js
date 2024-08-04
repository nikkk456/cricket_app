import React from 'react'

const NoFriend = () => {
  return (
    <div className='row p-2 ' style={{ display: "felx", justifyContent: "center", alignItems: "center", height: "85vh", borderRight: "1px solid black" }}>
     <div>
     <h4>NO Friend Found!</h4>
      <p>Dont worry invite them to Cricket_app. Because <br/>
      play together. stay together
      </p>
      <button type='button' className='btn btn-dark'>Invite Now!</button>
     </div>
    </div>
  )
}

export default NoFriend
