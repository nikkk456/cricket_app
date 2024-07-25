import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate = useNavigate();
    const handleClick=()=>{
        navigate('/login')
    }
    return (
        <>
            <div className='background-image' style={{display: 'flex', justifyContent:"center", alignItems:"center"}}>
                <div className='container content'>
                    <div className='row'>
                        <div className='col-md-7 col-lg-7' style={{display:"flex", justifyContent:"center", flexDirection:'column'}}>
                            <div className="row" >
                                <div className='row justify-content-center align-items-center playfair-display-sc-bold'>
                                    <h1 className='playfair-display-sc-bold'>Create and manage your <br /> cricket teams like a pro!</h1>
                                </div>
                                <div className='row my-2'>
                                    <small>Start Your Cricket Journey Now!</small>
                                </div>
                                <div className='row justify-content-center my-2'>
                                    <button type="button" className='btn btn-sm btn-dark text-white' style={{width:"20%", borderRadius:"20px"}} onClick={handleClick}>
                                        Start Playing
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-5 col-lg-5'>
                            <img src='./Image/cricket_image.png' alt='Cricket Image' style={{width: "100%"}} className='img-fluid' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection
