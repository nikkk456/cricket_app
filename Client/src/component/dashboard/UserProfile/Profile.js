import React, { useContext, useRef, useState } from 'react';
import { PlayerProfileContext } from '../../../context/PlayerProfileContext';

const Profile = () => {
    const { playerProfileData, setPlayerProfileData } = useContext(PlayerProfileContext);
    const fileInputRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Update the profile picture URL in the context
                setPlayerProfileData(prevData => ({
                    ...prevData,
                    profilePicture: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleImageClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    console.log()

    return (
        <div className="text-center" style={{ marginTop: "-60px", position: "relative" }}>
            <img
                src={playerProfileData.profilePicture || "https://github.com/mdo.png"}
                className="rounded-circle mt-n5"
                alt="Profile"
                style={{ width: "100px", height: "100px", border: "5px solid white" }}
                onClick={handleImageClick}
            />
            {/* <svg
                onClick={handleIconClick}
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "5px"
                }}
            >
                <path d="M12.146.854a.5.5 0 0 1 .708 0l1.292 1.292a.5.5 0 0 1 0 .708l-9 9a.5.5 0 0 1-.168.11l-3.5 1a.5.5 0 0 1-.641-.641l1-3.5a.5.5 0 0 1 .11-.168l9-9zM11.207 2L3 10.207V11h.793L13 3.793 11.207 2zM2 12.5V14h1.5l.5-.5h-2zm10-10L12.5 1.5 14 3l-1.5 1.5L12 3z" />
            </svg> */}
            <svg xmlns="http://www.w3.org/2000/svg" onClick={handleIconClick} style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "5px"
                }} fill="currentColor" width="25" height="25" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
            </svg>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <h2 className="mt-3">{playerProfileData.name || 'Captain Name'}</h2>
            <p>{playerProfileData.address || 'City, India'}</p>


            {/* Bootstrap Modal */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }} onClick={closeModal}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Profile Picture</h5>
                            <button type="button" className="btn-close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            <img
                                src={playerProfileData.profilePicture || "https://github.com/mdo.png"}
                                className="img-fluid"
                                alt="Profile"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
