import React from 'react'

const Register = () => {
  return (
    <div className='container my-3'>
      <div className='bona-nova-sc-bold text-center text-red'>
        <h1>You're just a step away from cricket greatness!</h1>
      </div>
      <div className='row my-3'>
        <div className='col-md-4' style={{ display: "flex", alignItems: "end" }}>
          <img src='./Image/signup_image.jpg' alt='signup_image' style={{ width: "100%" }} />
        </div>
        <div className='col-md-8'>
          <form style={{ width: "80%", borderRadius: "15px", boxShadow: "0 0 9px 1px grey" }} className='p-4'>

            {/* Full Name  */}
            <div className='row'>
              <div className='col-md-6'>
                <div data-mdb-input-init className="form-outline mb-4">
                  <label htmlFor="formName">Enter Full Name</label>
                  <input type="text" id="form3Example3" className="form-control "
                    placeholder="Enter Your First Name" required />
                </div>
              </div>
              <div className='col-md-6'>
                <div data-mdb-input-init className="form-outline mb-4">
                  <label htmlFor="formGender">Gender</label>
                  <select className="form-select form-select-md" aria-label="Small select example">
                    <option defaultValue>Male</option>
                    <option value="2">Female</option>
                    <option value="3">Others</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div data-mdb-input-init className="form-outline mb-4">
                  <label htmlFor="inputDateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputDateOfBirth"
                    // value={dob}
                    // onChange={(e) => setDob(e.target.value)}
                    // onChange={(e) => setDob(e.target.value)}
                    placeholder="Select date of birth"
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div data-mdb-input-init className="form-outline mb-4">
                  <label htmlFor="inputPhoneNumber">Phone Number</label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputPhoneNumber"
                    placeholder="98xxxxxxxx"
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div data-mdb-input-init className="form-outline mb-4">
                  <label htmlFor="form3Example3">Email address</label>
                  <input type="email" id="formEmail" className="form-control "
                    placeholder="Enter a valid email address" />
                </div>
              </div>
              <div className='col-md-6'>
                <div data-mdb-input-init className="form-outline mb-3">
                  <label htmlFor="form3Example4">Password</label>
                  <input type="password" id="formPassword" className="form-control"
                    placeholder="Enter password" />
                </div>
              </div>
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <label htmlFor="formAddress">Enter Residential Address</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Address'></textarea>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div data-mdb-input-init className="form-outline mb-4">
                  <label htmlFor="formState">State</label>
                  <input type="text" id="formState" className="form-control "
                    placeholder="Enter Your State" required />
                </div>
              </div>
              <div className='col-md-6'>
                <div data-mdb-input-init className="form-outline mb-4">
                  <label htmlFor="form3Example3">City</label>
                  <input type="text" id="formCity" className="form-control "
                    placeholder="Enter Your City" required />
                </div>
              </div>
            </div>

            <div className="text-center text-lg-start mt-3 pt-2">
              <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-sm btn-dark text-white"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Register</button>
              <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="/login"
                className="link-danger">Login Now</a></p>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
