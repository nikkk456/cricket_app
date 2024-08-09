import React, { useState } from 'react';
import axios from 'axios';
import { useLocation ,useNavigate} from 'react-router-dom';


const SetNewPassword = () => {
    const [loginData,setloginData] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const forgot = location.state?.forgot || 0;
    const email = location.state?.email || '';

    const handlechange = (e) => {
        setloginData({...loginData,[e.target.name]:e.target.value});
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(loginData.password!=loginData.confirmpassword){
            return   ;
        }
        const values = {email:email,password:loginData.password};
        axios.post("http://localhost:8080/api/user/resetpass",values).then((res)=>{
            console.log(res);
            if(res.status==200){
                navigate("/login");
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className='row justify-content-center align-items-center' style={{ width: '99%' }}>
            <div className="col-md-4 col-md-offset-4 p-5" style={{ border: '1px solid black', borderRadius: '10px' }}>
                <div>
                    <h2 className="text-center mt-3">Set New Password</h2>
                    <p className='text-center'>You can enter your new password here.</p>
                    <div className="panel-body">
                        <form id="register-form" role="form" autoComplete="off" className="form" method="post">
                            <label className='mt-3'>Type New Password</label>
                            <input
                                type="password"
                                className="form-control mt-2"
                                name='password'
                                id="typePassword"
                                placeholder='New Password'
                                onChange={handlechange}
                            />
                            <label className='mt-3'>Retype New Password</label>
                            <input
                                type="password"
                                name='confirmpassword'
                                className="form-control mt-2"
                                id="retypePassword"
                                placeholder='Re-type New Password'
                                onChange={handlechange}
                            />
                            <div className="form-group mt-3">
                                <button
                                    name="recover-submit"
                                    className="btn btn-dark"
                                    onClick={handleSubmit}
                                >
                                    Reset Password
                                </button>
                            </div>
                            <input type="hidden" className="hide" name="token" id="token" value="" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetNewPassword;
