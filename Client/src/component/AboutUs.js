import React from 'react'

const AboutUs = () => {
    return (
        <div className='container mt-3'>
            <h2 className='playfair-display-sc-bold'>About Us</h2>
            <div className='row'>
                <div className='col-md-8'>
                    <p>
                        Welcome to CricFight, the ultimate destination for cricket enthusiasts. We are dedicated to bringing together cricket lovers from all around the world, offering a platform where passion for the game meets the convenience of modern technology. <br />

                        At CricFight, we believe in creating a space where cricket fans can connect, compete, and celebrate the sport they love. Whether you’re looking to form your dream team, organize thrilling matches, or stay in touch with fellow players, our platform provides everything you need to make your cricketing experience more engaging and enjoyable.
                    </p>
                </div>
                <div className='col-md-4' style={{display:"flex", justifyContent:"center"}}>
                    <img src='./Image/CrickFightLogo.jpg' className='img-fluid' style={{width:"70%", borderRadius:"15px"}}/>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
