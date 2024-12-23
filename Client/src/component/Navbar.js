import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { PlayerProfileContext } from '../context/PlayerProfileContext';
const Navbar = () => {
    const location = useLocation();
    const showNavbar =  !(location.pathname.includes('/dashboard'));
    const { isAuthenticated } = useContext(AuthContext);
    const {playerProfileData} = useContext(PlayerProfileContext)

    console.log("isAuthenticated", isAuthenticated);
    return (
        <nav className={showNavbar ? "navbar navbar-expand-lg bg-body-tertiary" : "d-none"}>
            <div className="container-fluid">
                <Link className="navbar-brand m-0" style={{width:"3%"}} to="/"><img src='./Image/CricFight_Logo.png' alt='logo' className='img-fluid'/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Blogs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/scorecard">ScoreCard</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        {
                            isAuthenticated ?
                                    <a href="/dashboard/profile/about" className="d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none">
                                        <img src={playerProfileData.profilePicture || "https://github.com/mdo.png"}alt="mdo" width="24" height="24" className="rounded-circle" />
                                    </a>
                                :
                                <Link to="/login"><button className="btn btn-sm btn-dark text-white" style={{ borderRadius: "18px" }} type="submit">Join Now</button></Link>
                        }
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
