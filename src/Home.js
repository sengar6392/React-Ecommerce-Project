import React from 'react'
import HomeSection from "./components/HeroSection"
import Trusted from './components/Trusted'
import Services from "./components/Services"
import { useSelector } from 'react-redux'
import FeatureProduct from './components/FeatureProducts'
const Home = () => {
  const data={
    name:"Shopping Store"
  }
  return (
    <>
    <HomeSection myData={data}/>
    {/* <FeatureProduct/> */}
    <Trusted/>
    <Services/>
    </>
  )
}


export default Home