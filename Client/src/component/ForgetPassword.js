import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import OTPInput from './OTPInput';
import axiosinstance from '../axios/axiosInstance';


const ForgetPassword = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [showOTP, setShowOTP] = useState(false)
    const otpRef = useRef(null);

    const handleSubmit = (e) => {
        setShowLoader(true);
        e.preventDefault();
        const value = { email: email };
        axiosinstance.post("/user/forgot_pass", value).then((response) => {
            setShowLoader(false);
            console.log(response);
            if (response.status = 200) {
                setShowOTP(true);
            }

        }).catch((err) => {
            console.log(err);
        })
    }
    const handleOTPSubmit = () => {
        setShowLoader(true);
        const otpValue = otpRef.current.getOTP();
        const value = { email: email, otp: otpValue };
        axiosinstance.post("/user/verifyotp", value).then((res) => {
            setShowLoader(false);
            if (res.status == 200) {
                navigate('/SetNewPassword', { state: { email: email, forgot: 1 } });
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (

        <div className='row justify-content-center vh-100 align-items-center' style={{ width: "98%" }}>
            {
                showLoader ? <div className='col-md-4 col-md-offset-4 p-5' style={{ display: "flex", alignItems: "center", border: "1px solid black", borderRadius: "10px" }}>
                    <dotlottie-player src="https://lottie.host/fb5d52f2-d675-4352-a182-ee4e1c88bea9/SpTQ74uC8Z.json" background="transparent" speed="1" style={{ width: "300px", height: "100px" }} loop autoplay></dotlottie-player>
                </div> :
                    <>
                        {
                            showOTP ?
                                <div className='col-md-4'> <OTPInput ref={otpRef} onButtonClick={handleOTPSubmit} onOTPButtonClick={handleSubmit}  /></div>
                                :
                                <div className="col-md-4 col-md-offset-4 p-5" style={{ border: "1px solid black", borderRadius: "10px" }}>
                                    <div className="text-center">
                                        <h3><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                                        </svg></h3>
                                        <h2 className="text-center mt-3">Forgot Password?</h2>
                                        <p>You can reset your password here.</p>
                                        <div className="panel-body">

                                            <form id="register-form" role="form" autoComplete="off" className="form" method="post">

                                                <div className="form-group">
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-at" viewBox="0 0 16 16">
                                                            <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
                                                            <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                                                        </svg></span>
                                                        <input type="text" value={email} className="form-control" placeholder="Your email" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => { setEmail(e.target.value) }} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input name="recover-submit" className="btn btn-dark" value="Reset Password" type="submit" onClick={handleSubmit} />
                                                </div>
                                                <input type="hidden" className="hide" name="token" id="token" value="" />
                                            </form>

                                        </div>
                                    </div>
                                </div>
                        }
                    </>
            }

        </div>
    )
}

export default ForgetPassword
