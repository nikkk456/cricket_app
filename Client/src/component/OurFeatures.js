import React, { useState } from 'react'
import Skeleton from "react-loading-skeleton";
import { ShimmerCircularImage } from "react-shimmer-effects";

const OurFeatures = () => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };
    return (
        <div className='container mt-4'>
            <h2 className='mb-2 playfair-display-sc-bold'>Our Top Features</h2>
            <div className='row no-scrollbar features-row'>
                <div className='col-md-4 col-6' style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card features-card">
                        <div style={{ position: "relative" }}>
                            {isLoading && <ShimmerCircularImage size={150} />}
                            <img
                                src="./Image/Team_Create.png"
                                className="card-img-top"
                                alt="cricket team"
                                style={{
                                    borderRadius: "15px",
                                    height: "200px",
                                    display: isLoading ? "none" : "block", // Hide image until it's loaded
                                }}
                                onLoad={handleImageLoad} // Triggered when the image loads
                            />

                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-center">Team Creation</h5>
                            <p className="card-text text-center">
                                Create and manage your own cricket team with ease.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 col-6' style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card features-card " >
                        {isLoading && <ShimmerCircularImage size={150} />}
                        <img src="./Image/cricket_chat.png" className="card-img-top" alt="cricket team" style={{
                            height: "200px", borderRadius: "15px"
                        }}
                            onLoad={handleImageLoad} />
                        <div className="card-body">
                            <h5 className="card-title text-center">Chat</h5>
                            <p className="card-text text-center">Communicate with your team members through our chat feature.</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 col-6' style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card features-card " >
                        {isLoading && <ShimmerCircularImage size={150} />}
                        <img src="./Image/match_analysis.png" className="card-img-top" alt="cricket team" style={{
                            height: "200px", borderRadius: "15px"
                        }}
                            onLoad={handleImageLoad} />
                        <div className="card-body">
                            <h5 className="card-title text-center">Match Planning & Challenges</h5>
                            <p className="card-text text-center">Plan matches and challenge other teams.</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 col-6' style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card features-card " >
                        {isLoading && <ShimmerCircularImage size={150} />}
                        <img src="./Image/cricket_scorecard.png" className="card-img-top" alt="cricket team" style={{
                            height: "200px",
                            borderRadius: "15px"
                        }}
                            onLoad={handleImageLoad} />
                        <div className="card-body">
                            <h5 className="card-title text-center">ScoreCard</h5>
                            <p className="card-text text-center">Keep track of scores with detailed scorecards.</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 col-6' style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card features-card " >
                        {isLoading && <ShimmerCircularImage size={150} />}
                        <img src="./Image/leaderboard.jpg" className="card-img-top" alt="cricket team" style={{
                            height: "200px", borderRadius: "15px"
                        }} onLoad={handleImageLoad} />
                        <div className="card-body">
                            <h5 className="card-title text-center">LeaderBoard</h5>
                            <p className="card-text text-center">View the leaderboard to see the top teams and players.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurFeatures
