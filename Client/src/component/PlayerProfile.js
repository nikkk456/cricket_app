import React, { useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import About from './dashboard/UserProfile/About/About';
import Stats from './dashboard/UserProfile/Stats/Stats';

const PlayerProfile = () => {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();

    const handleImageClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div className='container-fluid'>

            {/* This is background image  */}
            <div className='header-image-container'>
                <div className="header-image headerimage" ></div>
            </div>

            {/* This is for profile picture section */}
            <div className="text-center" style={{ marginTop: "-60px", position: "relative" }}>
                <img
                    src={"https://github.com/mdo.png"}
                    className="rounded-circle mt-n5"
                    alt="Profile"
                    style={{ width: "100px", height: "100px", border: "5px solid white" }}
                    onClick={handleImageClick}
                />

                <div className='row align-items-center'>
                        <h2 className="mt-3 text-center">{'Captain Name'} <button className='btn btn-dark float-right'>Connect</button></h2>
                        <p className="text-center">{'City, India' || 'Links of Social Media'}</p>
                </div>


                {/* Bootstrap Modal for zooming profile picture*/}
                <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }} onClick={closeModal}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Profile Picture</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <img
                                    src={"https://github.com/mdo.png"}
                                    className="img-fluid"
                                    alt="Profile"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* This is the Ministat  */}
            <div className='container'>
                <div className="text-center mt-3 d-flex justify-content-center">
                    <div className="row text-white bg-dark p-3 rounded-pill" style={{ width: "45%", height: "90px" }}>
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

                {/* This is Abot and Stats Button  */}
                <div className='row justify-content-center mt-5'>
                    <div className='col-auto'>
                        <ul className="nav nav-underline">
                            <li className="nav-item mx-2">
                                <Link className={location.pathname.includes('/about') ? "nav-link active" : 'nav-link'} to="about">About</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className={location.pathname.includes('/stats') ? "nav-link active" : 'nav-link'} to="stats">Stats</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />
                <Routes>
                    <Route path="about" element={<About />} /> Isme About me ek object bhej dio containing every details of fetched user saari chije apne aap set ho jaaengi
                    <Route path="stats" element={<Stats />} />
                </Routes>


            </div>
        </div>
    )
}

export default PlayerProfile
