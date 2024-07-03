import { Layout } from 'antd'
import React from 'react'
import { useSearch } from '../context/search'

const Search = () => {
    const [values,setValues] = useSearch();
  return (
    <Layout title={'Search results'}>
        <div className='container'>
            <div className='text-center'>
                <h1>Search Results</h1>
                <h6>{values?.results.length < 1 ? 'No Products found' : `Found ${values?.results.length}`}</h6>

                <div className='d-flex flex-wrap'>
          {values.results.map((p) => (
                <div className="card m-2" key={p._id} style={{ width: "18rem"}}>
                  <img
                    src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                    <p className="card-text"> ₹ {p.price}</p>
              
                    <button className='btn btn-primary ms-2'>More Details</button>
                    <button className='btn btn-secondary ms-2'>Add To Cart</button>
                  
                  </div>
                </div>
              
            ))}
          </div>
            </div>
        </div>
      
    </Layout>
  )
}

export default Search
