import React, { useState } from 'react';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        rememberMe: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = ()=>{
        console.log(loginData)
    }

    return (
        <div className='container  my-3'>
            <div className='bona-nova-sc-bold text-center text-red'>
                <h1>Welcome back Captain!</h1>
            </div>
            <div className='row my-2'>
                <div className='col-md-4' style={{display:"flex", alignItems:"end"}}>
                    <img src='./Image/cricketer_with_bat.jpg' alt='Cricket_with_Bat' className='img-fluid' width="100%" />
                </div>
                <div className='col-md-8'>
                    <form style={{ width: "60%", borderRadius:"15px", boxShadow:"0 0 9px 1px grey" }} className='p-4'>
                        {/* Sign in with Google and Facebook */}
                        <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                            <button type="button" className="btn btn-dark btn-floating mx-1 rounded-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                </svg>
                            </button>

                            <button type="button" className="btn btn-dark btn-floating mx-1 rounded-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                                </svg>
                            </button>
                        </div>

                        <div className="divider d-flex align-items-center my-4">
                            <p className="text-center fw-bold mx-3 mb-0">Or</p>
                        </div>

                        {/* Email input */}
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example3">Email address</label>
                            <input type="email" name='email' id="form3Example3" className="form-control"
                                placeholder="Enter a valid email address" onChange={handleChange} />
                        </div>

                        {/* Password input */}
                        <div className="form-outline mb-3">
                            <label className="form-label" htmlFor="form3Example4">Password</label>
                            <input type="password" name='password' id="form3Example4" className="form-control"
                                placeholder="Enter password" onChange={handleChange} />
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            {/* Checkbox */}
                            <div className="form-check mb-0">
                                <input className="form-check-input me-2" type="checkbox" name="rememberMe" id="form2Example3" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="form2Example3">
                                    Remember me
                                </label>
                            </div>
                            <a href="#!" className="text-body">Forgot password?</a>
                        </div>

                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button type="button" className="btn btn-sm btn-dark text-white"
                                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} onClick={handleSubmit}>Login</button>
                            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                                className="link-danger">Register</a></p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
