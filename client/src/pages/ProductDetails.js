import { Layout } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProductDetailsStyles.css"

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});


  //initapl details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //get product
  const getProduct = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/products/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container m-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="400px"
            width="30px"
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price : 
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
            {/* {product?.price} */}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
    </Layout>
  );
};

export default ProductDetails;
