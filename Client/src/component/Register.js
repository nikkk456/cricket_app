import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import OTPInput from './OTPInput';



const Register = () => {
  const [showloader, setShowLoader] = useState(false);
  const [showOTP, setShowOTP] = useState(false)
  const [registerValue, setRegisterValue] = useState({
    name: '',
    gender: '',
    dob: '',
    number: '',
    email: '',
    password: '',
    address: '',
    state: '',
    city: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [response, Setresponse] = useState();
  const otpRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!registerValue.name) newErrors.name = 'Full Name is required';
    if (!registerValue.gender) newErrors.gender = 'Gender is required';
    if (!registerValue.dob) {
      newErrors.dob = 'Date of Birth is required';
    }
    if (!registerValue.number || !/^\d{10}$/.test(registerValue.number)) newErrors.number = 'Valid Phone Number is required';
    if (!registerValue.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(registerValue.email)) newErrors.email = 'Valid Email is required';
    if (!registerValue.password || registerValue.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    if (!registerValue.address) newErrors.address = 'Address is required';
    if (!registerValue.state) newErrors.state = 'State is required';
    if (!registerValue.city) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const registeruser = (event) => {
    event.preventDefault();
    //Isko ab tu email verification ke baad on kardio
    setShowLoader(true);
    if (!validate()) return;
    console.log(registerValue);
    axios.post("http://localhost:8080/api/user/otp", registerValue).then((res) => {
      console.log(res);
      setShowLoader(false);
      if (res.status = 201) {
        // navigate("/login");
        setShowOTP(true);
      }
    }).catch((err) => {
      console.log(err);
      if (err.response.status == 400) {
        Setresponse(err.response.data.msg);
        console.log(err.response.data.msg);
      } else {
        Setresponse(err.msg);
      }
    });
  }
  const handlechange = (event) => {
    setRegisterValue({ ...registerValue, [event.target.name]: event.target.value });
  }
  const handleOTPSubmit = () => {
    setShowLoader(true);
    const otpValue = otpRef.current.getOTP();
    const data_sent = {
      ...registerValue,
      otp: otpValue
    }
    console.log(data_sent);
    axios.post("http://localhost:8080/api/user/register", data_sent).then((res) => {
      console.log(res);
      setShowLoader(false);
      if (res.status = 201) {
        navigate("/login");
      }

    }).catch((err) => {
      console.log(err);
    })
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      registeruser();
    }
  };
  return (
    <div className='container my-3'>
      <div className='bona-nova-sc-bold text-center text-red'>
        <h1>You're just a step away from cricket greatness!</h1>
      </div>
      <div className='row my-3'>
        <div className='col-md-4' style={{ display: "flex", alignItems: "end" }}>
          <img src='./Image/signup_image.jpg' alt='signup_image' style={{ width: "100%" }} />
        </div>
        {
          showloader ?
            <div className='col-md-8' style={{ display: "flex", alignItems: "center" }}>
              <dotlottie-player src="https://lottie.host/fb5d52f2-d675-4352-a182-ee4e1c88bea9/SpTQ74uC8Z.json" background="transparent" speed="1" style={{ width: "300px", height: "100px" }} loop autoplay></dotlottie-player>
            </div>
            : <>
              {
                showOTP ?
                  <div className='col-md-8'> <OTPInput ref={otpRef} onButtonClick={handleOTPSubmit} /></div>
                  :
                  <div className='col-md-8'>
                    <form className='p-4 register-form' onSubmit={registeruser}>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div data-mdb-input-init className="form-outline mb-4">
                            <label htmlFor="formName">Enter Full Name</label>
                            <input type="text" name="name" onChange={handlechange} id="form3Example3" className="form-control "
                              placeholder="Enter Your First Name" required />
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div data-mdb-input-init className="form-outline mb-4">
                            <label htmlFor="formGender">Gender</label>
                            <select name="gender" onChange={handlechange} className="form-select form-select-md" aria-label="Small select example" required>
                              <option value="">Select Gender...</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="others">Others</option>
                            </select>
                            {errors.gender && <small className="text-danger">{errors.gender}</small>}
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div data-mdb-input-init className="form-outline mb-4">
                            <label htmlFor="inputDateOfBirth">Date of Birth</label>
                            <input
                              name="dob" onChange={handlechange}
                              type="date"
                              className="form-control"
                              id="inputDateOfBirth"
                              placeholder="Select date of birth"
                              required
                            />
                            {errors.dob && <small className="text-danger">{errors.dob}</small>}
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div data-mdb-input-init className="form-outline mb-4">
                            <label htmlFor="inputPhoneNumber">Phone Number</label>
                            <input
                              name="number" onChange={handlechange}
                              type="number"
                              className="form-control"
                              id="inputPhoneNumber"
                              placeholder="98xxxxxxxx"
                              required
                            />
                            {errors.number && <small className="text-danger">{errors.number}</small>}
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div data-mdb-input-init className="form-outline mb-4">
                            <label htmlFor="form3Example3">Email address</label>
                            <input type="email" name="email" onChange={handlechange} id="formEmail" className="form-control "
                              placeholder="Enter a valid email address" required />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div data-mdb-input-init className="form-outline mb-3">
                            <label htmlFor="form3Example4">Password</label>
                            <input type="password" name="password" onChange={handlechange} id="formPassword" className="form-control"
                              placeholder="Enter password" required />
                            {errors.password && <small className="text-danger">{errors.password}</small>}
                          </div>
                        </div>
                      </div>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <label htmlFor="formAddress">Enter Residential Address</label>
                        <textarea name="address" onChange={handlechange} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Address' required></textarea>
                        {errors.address && <small className="text-danger">{errors.address}</small>}
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div data-mdb-input-init className="form-outline mb-4">
                            <label htmlFor="formState">State</label>
                            <input type="text" name="state" onChange={handlechange} id="formState" className="form-control "
                              placeholder="Enter Your State" required />
                            {errors.state && <small className="text-danger">{errors.state}</small>}
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div data-mdb-input-init className="form-outline mb-4">
                            <label htmlFor="form3Example3">City</label>
                            <input type="text" name="city" onChange={handlechange} id="formCity" className="form-control "
                              placeholder="Enter Your City" required onKeyDown={handleKeyDown} />
                            {errors.city && <small className="text-danger">{errors.city}</small>}
                          </div>
                        </div>
                        {response && <small className="text-danger">{response}</small>}
                      </div>
                      <div className="text-center text-lg-start mt-3 pt-2">
                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-sm btn-dark text-white"
                          style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Register</button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="/login"
                          className="link-danger">Login Now</a></p>
                      </div>

                    </form>
                  </div>
              }
            </>
        }
      </div>
    </div>
  )
}

export default Register
