import axios from 'axios';
import React from 'react'
import { useEffect,useState } from 'react'
import Cookies from 'js-cookie';
const About = () => {
    const [input, setInput] = useState({});
    const [profile,setProfile] = useState({});
    const [token,settoken] = useState({}) ;
    const [userid,setUserid] = useState({});
    useEffect(() => {
        const fetchdata = async ()=>{
        settoken(Cookies.get('uid'));
        setUserid(Cookies.get('user_id'));
        const value = { user_id: Cookies.get('user_id') };
        await axios.post("http://localhost:8080/api/user/profile", value, {
            headers: {
                'Authorization': Cookies.get('uid')
            }
        })
        .then((response) => {
            if (response.data && response.data.length > 0) {
                console.log(response.data[0].id);
                setProfile({...response.data[0]});
                console.log(input);
            } else {
                console.log("Response data is empty or not as expected.");
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
    fetchdata();
    }, []);

    const handlechange = (e) =>{
        setProfile({...profile,[e.target.name]:e.target.value});
    }

    const submitprofile = ()=>{
        axios.post("http://localhost:8080/api/user/profile_update",profile,{
            headers:{
                Authorization:token,
                userid:userid
            }
        }).then((response)=>{
            console.log(response);
        }).catch((err)=>{
            console.log(err);
        });
    }

    return (
        <div className='container-fluid'>
            <div className='row mt-4'>
                <div className='col-md-6 mt-3'>
                    <div className='row'>
                    <h6>Captain Name</h6>
                        <b>{profile.name}</b>     
                    </div>
                </div>
                <div className='col-md-6 mt-3'>
                    <div className='row'>
                    <h6>Captain Gender</h6>
                        <b>{profile.gender}</b>
                    </div>
                </div>
                <div className='col-md-6 mt-3'>
                    <div className='row'>
                    <h6>Captain DOB</h6>
                        <b>{profile.dob}</b>
                    </div>
                </div>
                <div className='col-md-6 mt-3'>
                    <div className='row'>
                    <h6>Captain Email</h6>
                        <b>{profile.email}</b>
                    </div>
                </div>
                <div className='col-md-6 mt-3'>
                    <div className='row'>
                    <h6>Captain Phone No.</h6>
                        <b>{profile.number}</b>
                    </div>
                </div>
                <div className='col-md-6 mt-3'>
                    <div className='row'>
                    <h6>Captain Address</h6>
                        <b>{profile.address+"," + profile.state +"," +profile.city}</b>
                    </div>
                </div>
            </div>
            <hr />
            <h5>Please Fill the remaining details to complete your profile. </h5>
            <div className='row my-3'>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Playing Role</label>
                    <select className="form-select" aria-label="Default select example" name='playing_role' onChange={handlechange} value={profile.playing_role || ''}>
                        <option value="">Select your playing role</option>
                        <option  value="batsman">Batsman</option>
                        <option value="bowler">Bowler</option>
                        <option value="all_rounder">All-Rounder</option>
                        <option value="wicket_keeper_batsman">Wicket-Keeper Batsman</option>
                        <option value="wicket_keeper">Wicket-Keeper</option>
                        <option value="wicket_keeper_bowler">Wicket-Keeper Bowler</option>
                    </select>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Preferred Playing Position</label>
                    <select className="form-select" aria-label="Default select example" name='preferred_playing_position' onChange={handlechange} value={profile.preferred_playing_position || ''}>
                        <option value="">Select your playing role</option>
                        <option value="righty" >Right Hand</option>
                        <option value="lefty">Left hand</option>
                    </select>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Batting Style</label>
                    <select className="form-select" aria-label="Default select example" name='batting_style' onChange={handlechange} value={profile.batting_style || ''}>
                    <option value="">Select your playing role</option>
                        <option value="righty" >Right Hand</option>
                        <option value="lefty">Left hand</option>
                    </select>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Bowling Style</label>
                    <select className="form-select" aria-label="Default select example" name='bowling_style' onChange={handlechange} value={profile.bowling_style || ''}>
                    <option value="">Select your playing role</option>
                        <option value="right_hand_fast" >Right Hand Fast</option>
                        <option value="left_hand_fast">Left hand Fast</option>
                        <option value="right_hand_medium_pace">Right hand Medium Pace</option>
                        <option value="left_hand_medium_pace">Left hand Medium Pace</option>
                        <option value="left_hand_spin">Left hand spin</option>
                        <option value="right_hand_spin">Right hand spin</option>
                    </select>
                </div>
                <h5 className='mt-3'>Physical Attributes</h5>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Your height in cm.</label>
                    <input type="number" className="form-control" id="playerHeight" name='height' onChange={handlechange} value={profile.height || ''}></input>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Your weight in kg.</label>
                    <input type="number" className="form-control" id="playerWeight" name='weight' onChange={handlechange} value={profile.weight || ''}></input>
                </div>
                <h5 className='mt-3'>Cricket Experience</h5>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Year of Experience</label>
                    <input type="number" className="form-control" id="yearofexperience" name='experience' onChange={handlechange} value={profile.experience || ''}></input>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Highest Level Played</label>
                    <select className="form-select" aria-label="Default select example" name='highest_level_played' onChange={handlechange} value={profile.highest_level_played || ''}>
                    <option value="">Select your playing role</option>
                        <option  value="school/college" >School/College Level</option>
                        <option value="district">District Level</option>
                        <option value="state">State Level</option>
                        <option value="national">National Level</option>
                    </select>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Previous Team</label>
                    <select className="form-select" aria-label="Default select example" name='previous_Team' onChange={handlechange} value={profile.previous_Team || ''}>
                        <option value="team1" >Team 1</option>
                        <option value="team2">Team 2</option>
                        <option value="team3">Team 3</option>
                    </select>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Any Achievement</label>
                    <input type="text"  className="form-control" id="achievement" name='achievement' onChange={handlechange} value={profile.achievement || ''}></input>
                </div>
                <h5 className='mt-5'>Availability</h5>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Days Availabble for match per week</label>
                    <input type="text" className="form-control" id="availability" name='availability_days'  onChange={handlechange} value={profile.availability_days || ''}></input>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Preferred Timing for the match</label>
                    <select className="form-select" aria-label="Default select example" name='timing' onChange={handlechange} value={profile.timing || ''}>
                    <option value="">Select your playing role</option>
                        <option  value="morning" >Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                    </select>
                </div>
                <h5 className='mt-3'>Social Media Links</h5>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">InstaGram</label>
                    <input type="text" className="form-control" id="availability" placeholder='Paste your instagram link here ' name='instagram_links' onChange={handlechange} value={profile.instagram_links || ''}></input>
                </div>
                <div className='col-md-6 mt-3'>
                    <label className="form-label">Facebook</label>
                    <input type="text" className="form-control" id="availability" placeholder='Paste your Facebook profile link here ' name='facebook_links' onChange={handlechange} value={profile.facebook_links || ''}></input>
                </div>
                <button type='button' className='btn btn-dark mt-3' style={{width:"20%"}} onClick={submitprofile}>Save</button>
            </div>
        </div>
    )
}

export default About
