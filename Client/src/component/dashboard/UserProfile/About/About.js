import React from 'react'

const About = () => {
    return (
        <div className='container-fluid'>
            <div className='row mt-4'>
                <div className='col-md-6 mt-3'>
                    <div className='row'>
                        <h5><b>Your Name</b></h5>
                        <h6>Captain Name</h6>
                    </div>
                </div>
                <div className='col-md-6 mt-3'>
                    <div className='row'>
                        <h5><b>Your Gender</b></h5>
                        <h6>Captain Gender</h6>
                    </div>
                </div>
                <div className='col-md-6 mt-3'>
                    <div className='row'>
                        <h5><b>Your Date Of birth</b></h5>
                        <h6>Captain DOB</h6>
                    </div>
                </div>
                <div className='col-md-6 mt-3'>
                    <div className='row'>
                        <h5><b>Your Email</b></h5>
                        <h6>Captain Email</h6>
                    </div>
                </div>
                <div className='col-md-6 mt-3'>
                    <div className='row'>
                        <h5><b>Your Phone No.</b></h5>
                        <h6>Captain Phone No.</h6>
                    </div>
                </div>
                <div className='col-md-6 mt-3'>
                    <div className='row'>
                        <h5><b>Your Address</b></h5>
                        <h6>Captain Address</h6>
                    </div>
                </div>
            </div>
            <hr />
            <h5>Please Fill the remaining details to complete your profile. </h5>
            <div className='row my-3'>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Playing Role</label>
                    <select className="form-select" aria-label="Default select example">
                        <option defaultValue>Batsman</option>
                        <option value="lefty">Bowler</option>
                        <option value="lefty">All-Rounder</option>
                        <option value="lefty">Wicket-Keeper</option>
                    </select>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Preferred Playing Position</label>
                    <select className="form-select" aria-label="Default select example">
                        <option defaultValue>Right Hand</option>
                        <option value="lefty">Left hand</option>
                    </select>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Batting Style</label>
                    <select className="form-select" aria-label="Default select example">
                        <option defaultValue>Right Hand</option>
                        <option value="lefty">Left hand</option>
                    </select>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Bowling Style</label>
                    <select className="form-select" aria-label="Default select example">
                        <option defaultValue>Right Hand Fast</option>
                        <option value="lefty">Left hand Fast</option>
                        <option value="lefty">Right hand Medium Pace</option>
                        <option value="lefty">Left hand Medium Pace</option>
                        <option value="lefty">Left hand spin</option>
                        <option value="lefty">Right hand spin</option>
                    </select>
                </div>
                <h5 className='mt-3'>Physical Attributes</h5>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Your height in cm.</label>
                    <input type="number" className="form-control" id="playerHeight"></input>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Your weight in kg.</label>
                    <input type="number" className="form-control" id="playerWeight"></input>
                </div>
                <h5 className='mt-3'>Cricket Experience</h5>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Year of Experience</label>
                    <input type="number" className="form-control" id="yearofexperience"></input>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Highest Level Played</label>
                    <select className="form-select" aria-label="Default select example">
                        <option defaultValue>School/College Level</option>
                        <option value="lefty">District Level</option>
                        <option value="lefty">State Level</option>
                        <option value="lefty">National Level</option>
                    </select>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Previous Team</label>
                    <select className="form-select" aria-label="Default select example">
                        <option defaultValue>Team 1</option>
                        <option value="lefty">Team 2</option>
                        <option value="lefty">Team 3</option>
                    </select>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Any Achievement</label>
                    <input type="text" className="form-control" id="acjievement"></input>
                </div>
                <h5 className='mt-5'>Availability</h5>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Days Availabble for match per week</label>
                    <input type="text" className="form-control" id="availability"></input>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Preferred Timing for the match</label>
                    <select className="form-select" aria-label="Default select example">
                        <option defaultValue>Morning</option>
                        <option value="lefty">Afternoon</option>
                        <option value="lefty">Evening</option>
                    </select>
                </div>
                <h5 className='mt-3'>Social Media Links</h5>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">InstaGram</label>
                    <input type="text" className="form-control" id="availability" placeholder='Paste your instagram link here '></input>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Facebook</label>
                    <input type="text" className="form-control" id="availability" placeholder='Paste your Facebook profile link here '></input>
                </div>
                <button type='button' className='btn btn-dark mt-3' style={{width:"20%"}}>Save</button>
            </div>
        </div>
    )
}

export default About
