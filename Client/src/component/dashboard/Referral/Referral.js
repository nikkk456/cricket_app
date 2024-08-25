import React from 'react'

const Referral = () => {
    return (
        <div className='container'>
            {/* Hero Section  */}
            <div className='row' style={{ height: "70vh" }}>
                <div className='col-md-7' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h2>Your Friends, Your Team, Your Rewards!</h2>
                    <h5>Every Referral is a Winning Shot!</h5>
                    <p className='text-center'>
                        Bring your friends into the game and get rewarded! Referring others not only strengthens our cricket community but also boosts your score. Each successful referral earns you points, bringing you closer to unlocking premium cricket accessories. The more friends you invite, the more you win!
                    </p>
                    <button className='btn btn-dark'>Refer Now</button>
                </div>
                <div className='col-md-5' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <img src='./Image/Refer.jpg' alt='Referral_Image' style={{ width: "100%" }} />
                </div>
            </div>

            {/* Your Coin  */}
            <div className='' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <h6>Referral Rewards</h6>
                <button className='btn btn-dark'>Your Coin</button>
            </div>


            <div className='row mt-4'>
                <div className='col-md-4'>
                    <div className="card" style={{width: "18rem"}}>
                        <img src="./Image/cricket_ball.jpg" className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Cricket Ball</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                <a href="#" className="btn btn-primary">Get It</a>
                            </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className="card" style={{width: "18rem"}}>
                        <img src="./Image/cricket_bat.jpg" className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Cricket Ball</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                <a href="#" className="btn btn-primary">Get It</a>
                            </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className="card" style={{width: "18rem"}}>
                        <img src="./Image/cricket_ball.jpg" className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Cricket Ball</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                <a href="#" className="btn btn-primary">Get It</a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Referral
