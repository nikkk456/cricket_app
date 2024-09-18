import React, { useState } from 'react'
// import axios from 'axios';
import Cookies from 'js-cookie'
import axiosinstance from '../../../axios/axiosInstance';

const Referral = () => {
    const [referralLink, setReferralLink] = useState('');
    const userId = Cookies.get("user_id");
    const generateReferralLink = async () => {
        try {
            const response = await axiosinstance.post('user/generate-referral', { userId });
            console.log("Response after generating referral code ", response);
            const link = `${window.location.origin}/register?ref=${response.data.referral_link}`;
            setReferralLink(link);
            navigator.clipboard.writeText(link);
            alert('Referral link copied to clipboard!');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='container'>
            {/* Hero Section  */}
            <div className='row' style={{ height: "70vh" }}>
                <div className='col-md-7' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h2 >Your Friends, Your Team, Your Rewards!</h2>
                    <h5 >Every Referral is a Winning Shot!</h5>
                    <p className='text-center'>
                        Bring your friends into the game and get rewarded! Referring others not only strengthens our cricket community but also boosts your score. Each successful referral earns you points, bringing you closer to unlocking premium cricket accessories. The more friends you invite, the more you win!
                    </p>
                    <button className='btn btn-dark' onClick={generateReferralLink}>Refer Now</button>
                </div>
                <div className='col-md-5' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <img src='/Image/Refer.jpg' alt='Referral_Image' style={{ width: "100%" }} />
                </div>
            </div>

            {/* Your Coin  */}
            <div className='' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <h6></h6>
                <button className='btn btn-dark'>Your Coin 0
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" className="bi bi-coin mx-1" viewBox="0 0 16 16">
                        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg>
                </button>
            </div>

            <div className='row mt-4'>
                <h3 className='playfair-display-sc-bold'>How referral works ?</h3>
                <p className='mt-2'>Get ready to boost your game with our exciting referral and reward program! As soon as you join, you'll get 100 coins as a welcome bonus—completely free! Here's the best part: every 10 coins equal 1 rupee, and once you’ve collected enough coins, you can redeem them for fantastic rewards. <br /><br/>
                    <strong>Want to earn even more?</strong> It's easy! Invite your friends to join the fun, and you'll earn coins for each successful referral. Plus, every time you challenge other players or teams, you'll have a chance to win even more coins if you emerge victorious. The more you play, the more you earn—so start collecting those coins and unlock amazing rewards!</p>
            </div>


            <div className='row mt-4 mb-5' style={{ overflowX: "auto", alignItems: "center", height: "450px", flexWrap: "nowrap" }}>
                <div className='col-md-4 col-10'>
                    <div className="card" style={{ width: "20rem", boxShadow: "0px 0px 7px 1px" }}>
                        <img src='/Image/cricket_ball.jpg' className="card-img-top" alt="..." />
                        <div className="card-body">
                            <div className='d-flex' style={{ justifyContent: "space-between", width: "18rem" }}><h5 className="card-title">Cricket Ball</h5>
                                <div>
                                    <strong>150</strong> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" className="bi bi-coin mx-1" viewBox="0 0 16 16">
                                        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                    </svg>
                                </div>
                            </div>
                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                            <a href="#" className="btn btn-dark">Get It Now!</a>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 col-10'>
                    <div className="card" style={{ width: "20rem", boxShadow: "0px 0px 7px 1px" }}>
                        <img src="/Image/Cricket_Tshirt.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <div className='d-flex' style={{ justifyContent: "space-between", width: "18rem" }}><h5 className="card-title">T-Shirt of your Name</h5>
                                <div>
                                    <strong>250</strong> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" className="bi bi-coin mx-1" viewBox="0 0 16 16">
                                        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                    </svg>
                                </div>
                            </div>
                            <a href="#" className="btn btn-dark">Get It Now!</a>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 col-10'>
                    <div className="card" style={{ width: "20rem", boxShadow: "0px 0px 7px 1px" }}>
                        <img src="/Image/cricket_bat.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <div className='d-flex' style={{ justifyContent: "space-between", width: "18rem" }}><h5 className="card-title">Cricket Bat</h5>
                                <div>
                                    <strong>450</strong> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" className="bi bi-coin mx-1" viewBox="0 0 16 16">
                                        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                    </svg>
                                </div>
                            </div>
                            <a href="#" className="btn btn-dark">Get It Now!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Referral
