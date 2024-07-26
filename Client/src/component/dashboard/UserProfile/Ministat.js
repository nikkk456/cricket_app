import React from 'react'

const Ministat = () => {
    return (
        <div className='container'>
            <div className="text-center mt-3 d-flex justify-content-center">
                <div className="row text-white bg-dark p-3 rounded-pill" style={{width:"45%"}}>
                    <div className="col-4">
                        <h5>0</h5>
                        <p>Matches</p>
                    </div>
                    <div className="col-4">
                        <h5>0</h5>
                        <p>Runs</p>
                    </div>
                    <div className="col-4">
                        <h5>0</h5>
                        <p>Wicket</p>
                    </div>
                </div>
            </div>
            <div className='row mt-2'>
                <div className='col-md-6'>
                    <div className='row'>
                        <h5><b>Your Name</b></h5>
                        <h6>Captain Name</h6>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='row'>
                        <h5><b>Your Email</b></h5>
                        <h6>Captain Email</h6>
                    </div>
                </div>
            </div>
            <div className='row mt-2'>
                <div className='col-md-6'>
                    <div className='row'>
                        <h5><b>Your Gender</b></h5>
                        <h6>Captain Gender</h6>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='row'>
                        <h5><b>Your Phone No.</b></h5>
                        <h6>Captain Phone No.</h6>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Ministat
