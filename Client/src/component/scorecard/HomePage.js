import React, { useState } from 'react'
import RecentMatch from './RecentMatch'
import LeaderBoard from './LeaderBoard'
import Select from 'react-select';

const HomePage = () => {
    const arr = ['1', '2', '3', '4', '5'];
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [time, setTime] = useState("");
    const [betting, setBetting] = useState(false);

    const handleTimeChange = (event) => {
        const timeValue = event.target.value;
        setTime(convertTo12HourFormat(timeValue));
    };

    const convertTo12HourFormat = (time24) => {
        const [hour, minute] = time24.split(":");
        const period = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minute} ${period}`;
    };

    const options = [
        { value: 'Nikhil Mishra', label: 'Nikhil Mishra' },
        { value: 'Sumit Kumar', label: 'Sumit Kumar' },
        { value: 'Harsh Sharma', label: 'Harsh Sharma' },
        { value: 'Bhupendra Jogi', label: 'Bhupendra Jogi' },
        { value: 'Shanu Khan', label: 'Shanu Khan' }
    ];

    const handleChange = (selectedOptions) => {
        setSelectedPlayers(selectedOptions);
    };
    return (
        <div className='container'>
            <div className='row' style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "20vh" }}>
                <h2 className='playfair-display-sc-bold'>Welcome to CricFight ScoreCard</h2>
            </div>
            <div className='row'>
                <div className='col-md-8' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3>Ready, Set, Score! Ignite Rivalries and Dominate the Field!</h3>
                    <p>Step onto the pitch, challenge your fiercest rivals, and let the scorecard tell the tale of your triumphs. Every match is a new battle—make every run count and lead your team to victory!</p>
                    <div>
                        <button className='btn btn-dark mx-2' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setBetting(true) }}>
                            Betting Match
                        </button>
                        <button className='btn btn-dark mx-2' data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Friendly Match
                        </button></div>
                </div>
                <div className='col-md-4'>
                    <img src='./Image/scorecardhome.png' alt='cricket-image' className='img-fluid' style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70% ", boxShadow: "0px 0px 9px 3px grey" }} />
                </div>
            </div>
            <div className='row mt-2'>
                <h4>Your Recent Matches</h4>
            </div>
            <div className='row no-scrollbar' style={{ overflowX: "auto", flexWrap: "nowrap" }}>
                <RecentMatch />
                <RecentMatch />
                <RecentMatch />
                <RecentMatch />
                <RecentMatch />
                <RecentMatch />
                <RecentMatch />
                <RecentMatch />
                <RecentMatch />
                <RecentMatch />
            </div>
            <div className='row mt-2'>
                <h4>Current LeaderBoard</h4>
            </div>
            <div className='row mt-2'>
                {
                    arr.map((data, index) => (
                        <LeaderBoard index={index} />
                    ))
                }
            </div>














            {/* MOdal starts here  */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{ padding: "10px" }}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Choose Teams</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='d-flex justify-content-center align-items-center'>
                                <img src={"https://i.ibb.co/tMDN1vK/cricket-team.jpg"} alt="TeamA" width="50" height="50" className="rounded-circle mx-2 border" style={{ boxShadow: "0px 0px 4px 2px grey" }} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-lightning-fill" viewBox="0 0 16 16">
                                    <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
                                </svg>
                                <img src={"https://github.com/mdo.png"} alt="Team" width="50" height="50" style={{ boxShadow: "0px 0px 4px 2px grey" }} className="rounded-circle mx-2" />
                            </div>
                            <div className='container'>
                                <div className='row mt-2'>
                                    <div className='col-md-6'>
                                        <h6>Team A</h6>
                                        <select className="form-select" aria-label="Default select example" name='preferred_playing_position'>
                                            <option value="">Select First Team</option>
                                            <option value="Top-Order" >Bengal Tigers</option>
                                            <option value="Middle-Order">UP Warriers</option>
                                            <option value="Lower-Order">Haryana Steelers</option>
                                            <option value="Lower-Order">Goa Funkies</option>
                                        </select>
                                    </div>
                                    <div className='col-md-6'>
                                        <h6>Team B</h6>
                                        <select className="form-select" aria-label="Default select example" name='preferred_playing_position'>
                                            <option value="">Select First Team</option>
                                            <option value="Top-Order" >Bengal Tigers</option>
                                            <option value="Middle-Order">UP Warriers</option>
                                            <option value="Lower-Order">Haryana Steelers</option>
                                            <option value="Lower-Order">Goa Funkies</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-md-6'>
                                        <h6>Select Players</h6>
                                        <Select
                                            isMulti
                                            name="players"
                                            options={options}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='col-md-6'>
                                        <h6>Select Players</h6>
                                        <Select
                                            isMulti
                                            name="players"
                                            options={options}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-md-6'>
                                        <h6>No. Of Overs</h6>
                                        <input type="number" className="form-control" id="playerWeight" name='overs' placeholder='Number of overs'></input>
                                    </div>
                                    <div className='col-md-6'>
                                        <h6>
                                            Start Time
                                        </h6>
                                        <input
                                            id="timeInput"
                                            type="time"
                                            onChange={handleTimeChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {betting && ( // Conditionally show for Betting Match only
                                <div className='d-flex align-items-center justify-content-end'>
                                    <h6 className='mx-2'>Challenge Coins</h6>
                                    <div class="input-group" style={{width:"30%"}}>
                                        <input type="number" class="form-control" placeholder="Coins" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <span class="input-group-text" id="basic-addon2" style={{padding:"5px"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" className="bi bi-coin mx-1" viewBox="0 0 16 16">
                                            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                        </svg></span>
                                    </div>
                                </div>
                            )}
                            <button type="button" className="btn btn-dark btn-sm">Lets Fight!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
