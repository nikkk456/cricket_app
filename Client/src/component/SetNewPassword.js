import React, { useState } from 'react';

const SetNewPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [renewPassword, setReNewPassword] = useState('');

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleReNewPasswordChange = (e) => {
        setReNewPassword(e.target.value);
    };

    const isPasswordMatch = newPassword && newPassword === renewPassword;

    const handleSubmit = ()=>{

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
                                id="typePassword"
                                placeholder='New Password'
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                            />
                            <label className='mt-3'>Retype New Password</label>
                            <input
                                type="password"
                                className="form-control mt-2"
                                id="retypePassword"
                                placeholder='Re-type New Password'
                                value={renewPassword}
                                onChange={handleReNewPasswordChange}
                            />
                            <div className="form-group mt-3">
                                <button
                                    name="recover-submit"
                                    className="btn btn-dark"
                                    type="submit"
                                    disabled={!isPasswordMatch}
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
