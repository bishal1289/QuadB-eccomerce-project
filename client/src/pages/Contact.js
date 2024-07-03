import React from 'react'
import Layout from '../components/Layout/Layout'
const Contact = () => {
  return (
    <Layout title={"contact now"}>
      <div className='row contactus'>
        <div className='col-md-6 mt-4 m-3'>
          <img src='images/contact.jpg' alt='contactus' style={{ width:'100%' }}/>
        </div>
        <div className='col-md-4 mt-4 m-3'>
          <h1 className='bg-dark p-2 text-white text-center'>Contact Us</h1>
          <p className='text-justify mt-3'>Any query and info about product fell free to call
          anytime we 24x7 available
          </p>
          <p className='mt-3'>
            📩 : www.help@ecommerceapp.com
          </p>
          <p className='mt-3'>
            📞 : +91 7261073242
          </p>
          <p className='mt-3'>
            💁‍♀️ : 1800-0000-0000 (tolll free)
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
