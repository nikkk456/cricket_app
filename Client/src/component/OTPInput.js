import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const OTPInput = forwardRef((props, ref) => {
    const inputsRef = useRef([]);

    useImperativeHandle(ref, () => ({
        getOTP: () => {
            return inputsRef.current.map(input => input?.value ?? '').join('');
        }
    }));

    useEffect(() => {
        const inputs = inputsRef.current;

        const handleKeyDown = (event, i) => {
            if (event.key === "Backspace") {
                inputs[i].value = '';
                if (i !== 0) inputs[i - 1].focus();
            } else {
                if (i === inputs.length - 1 && inputs[i].value !== '') {
                    return true;
                } else if (event.keyCode > 47 && event.keyCode < 58) {
                    inputs[i].value = event.key;
                    if (i !== inputs.length - 1) inputs[i + 1].focus();
                    event.preventDefault();
                } else if (event.keyCode > 64 && event.keyCode < 91) {
                    inputs[i].value = String.fromCharCode(event.keyCode);
                    if (i !== inputs.length - 1) inputs[i + 1].focus();
                    event.preventDefault();
                }
            }
        };

        inputs.forEach((input, i) => {
            input.addEventListener('keydown', (event) => handleKeyDown(event, i));
        });

        return () => {
            inputs.forEach((input, i) => {
                if (input) {
                    input.removeEventListener('keydown', (event) => handleKeyDown(event, i));
                }
            });
        };
    }, []);

    return (
        <div className="container d-flex align-items-center">
            <div className="position-relative">
                <div className="card p-2 text-center">
                    <h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-envelope-check" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
                            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686" />
                        </svg>
                    </h3>
                    <h6>Please enter the one time password <br /> to verify your account</h6>
                    <div>
                        <span>A code has been sent to your mail id</span>
                    </div>
                    <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
                        {[...Array(6)].map((_, i) => (
                            <input
                                key={i}
                                className="m-2 text-center form-control rounded"
                                type="text"
                                maxLength="1"
                                ref={el => inputsRef.current[i] = el}
                            />
                        ))}
                    </div>
                    <div className="content d-flex justify-content-center align-items-center">
                        <span style={{color:"black"}}>Didn't get the code</span>
                        <a href="#" onClick={props.onOTPButtonClick} className="text-decoration-none ms-3" >Resend OTP</a>
                    </div>
                    <div className="mt-4">
                    <button className="btn btn-dark px-4 validate" onClick={props.onButtonClick}>Validate</button>
                  </div>
                </div>
            </div>
        </div>
    );
});

export default OTPInput;
