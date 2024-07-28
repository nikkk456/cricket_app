import React, { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import About from './About'
import ListOfFriend from './Friends/ListOfFriend'

const Ministat = () => {
    const location = useLocation();
    return (
        <div className='container'>
            <div className="text-center mt-3 d-flex justify-content-center">
                <div className="row text-white bg-dark p-3 rounded-pill" style={{ width: "45%", height:"90px" }}>
                    <div className="col-4">
                        <h5>0</h5>
                        <h6>Matches</h6>
                    </div>
                    <div className="col-4">
                        <h5>0</h5>
                        <h6>Runs</h6>
                    </div>
                    <div className="col-4">
                        <h5>0</h5>
                        <h6>Wicket</h6>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center mt-5'>
                <div className='col-auto'>
                    <ul className="nav nav-underline">
                        <li className="nav-item mx-2">
                        <Link className={location.pathname.includes('/about')?"nav-link active":'nav-link'} to="about">About</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <a className={location.pathname.includes('/stats')?"nav-link active":'nav-link'} href="#">Stats</a>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className={location.pathname.includes('/friends')?"nav-link active":"nav-link"} to="friends">Friends</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link disabled" aria-disabled="true">Join Academy</a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr/>
            <Routes>
                <Route path = "about" element={<About/>}/>
                <Route path = "friends" element={<ListOfFriend/>}/>
            </Routes>
            

        </div>
    )
}

export default Ministat
