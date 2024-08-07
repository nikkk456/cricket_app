import React, {useState} from 'react'

const AccountSetting = () => {
    const [phone_no, setphone] = useState(false);
    const [Password, setPassword] = useState(false);
    const [forminput,setforminput] = useState({new_password:'',confirm_password:''});
    const handlechange = (e)=>{
      setforminput({...forminput,[e.target.name]:e.target.value});
    }
    return (
        <div>
            <div className={'container my-3'} style={{ paddingLeft: "5%", height:"80vh", borderRadius: "10px", boxShadow: "0px 0px 6px 1px grey"}}>
                <h3 className='text-center'>Your account settings</h3>
                <div className='row mt-5'>
                    <div className='col-md-6'>
                        <h5>Phone Number <small>(You can't Change your email)</small> </h5>
                        <p>9876543456</p>
                    </div>
                    <div className='col-md-6'>
                        <h5>Email adress <small>(You can't Change your email)</small></h5>
                        <p>mishranp3@gmail.com</p>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-6'>
                        <h5>Current Password</h5>
                        <p>Password</p>
                        <a href='#' >Change Password?</a>
                        {
                            Password ? <>
                                <input name='new_password' onChange={handlechange} type='password' className='form-control my-2' placeholder='Enter New password' style={{ width: "50%" }}></input><input name='confirm_password' onChange={handlechange} type='password' className='form-control mb-2' placeholder='Confirm New password' style={{ width: "50%" }}></input>
                                <button className="btn btn-dark mx-2" style={{ padding: "5px 13px", width: "25%", border: "1px solid black", marginTop: "20px" }}>Save changes</button>
                            </> : ""
                        }
                    </div>
                    <div className='col-md-6'>
                        <h5>Deactivate Your account</h5>
                        <button className="btn btn-dark my-2" style={{ width: "40%" }}>Delete Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSetting
