import React from 'react'

const FAQ = () => {
    return (
        <div className='container mt-3'>
            <h2 className='playfair-display-sc-bold'>Frequently Asked Question</h2>
            <div className='row'>
                <div className='col-md-5' style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
                    <img src='./Image/FAQ.jpg' alt='FAQ image' className='img-fluid' style={{width:"100%"}}/>
                </div>
                <div className='col-md-7'>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    How do I register on the platform?
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    To register, click on the "Join Now" button on the homepage, fill in your details, and verify your email. Once registered, you can start building your team or joining existing ones.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Are there any costs associated with using the platform?
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    All features of our platform are FREE. You can create or even join existing team make challenges update scorecard and make yourself on leaderboard all for Free!!!
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    What is the process for challenging another team?
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    To challenge another team, go to the "Matches" section, select the team you want to challenge, choose an available date and time, and send the challenge request. The other team will be notified to accept or decline.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    What is the leaderboard, and how is it calculated?
                                </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    The leaderboard displays the top-performing teams based on their match wins, points, and other performance metrics. It’s updated monthly, and teams earn points for every match they play and win.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ
