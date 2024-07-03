import React from 'react'
import Layout from '../components/Layout/Layout'
const Policy = () => {
  return (
    <Layout title={"Privacy & Policy"}>
      <div className='row contactus'>
        <div className='col-md-7 mt-4 m-3'>
          <img src='images/policy1.webp' alt='contactus' style={{ width:'100%' }}/>
        </div>
        <div className='col-md-4 mt-4 m-3'>
          <h1 className='bg-dark p-2 text-white text-center'>Privacy & Policy</h1>
          <p className='text-justify mt-3'>lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Quasi voluptas eaque quo nulla! 
        </p>
        </div>
      </div>
    </Layout>
  )
}

export default Policy
