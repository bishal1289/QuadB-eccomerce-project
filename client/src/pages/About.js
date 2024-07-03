import React from 'react'
import Layout from '../components/Layout/Layout'
const About = () => {
  return (
    <Layout title={'About us - Ecommerce App'}>
       <div className='row contactus'>
        <div className='col-md-6 mt-4 m-3'>
          <img src='images/about.jpg' alt='contactus' style={{ width:'100%' }}/>
        </div>
        <div className='col-md-4 mt-4 m-3'>
          <h1 className='bg-dark p-2 text-white text-center'>About Us</h1>
          <p className='text-justify mt-3'>lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Quasi voluptas eaque quo nulla! 
        </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
