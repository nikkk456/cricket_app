import React from 'react'
import HeroSection from './HeroSection'
import TopCricketTeam from './TopCricketTeam'
import OurFeatures from './OurFeatures'
import AboutUs from './AboutUs'
import FAQ from './FAQ'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <AboutUs/>
      <OurFeatures/>
      <TopCricketTeam/>
      <FAQ/>
    </div>
  )
}

export default Home
