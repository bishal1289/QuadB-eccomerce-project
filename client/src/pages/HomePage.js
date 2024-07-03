import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import slideP from "./slidep.jpg";
import "../styles/Homepage.css";

const HomePage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noMatchingItems, setNoMatchingItems] = useState(false); // State to track no matching items

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts(); // Fetch all products on initial load
  }, []);

  // Get total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/products`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  
   //filter by cartegory
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //call useEffect hook
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
       ` ${process.env.REACT_APP_API}/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
      if (!data.products) {
        setNoMatchingItems(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
    // Add product to cart
  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);
    console.log(existingProductIndex)

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedProduct = { ...product, quantity: 1};
      setCart([...cart, updatedProduct]);
      
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, updatedProduct])
      );
    }

    toast.success("Item Added to cart");
  };

  return (
    <Layout title={"All Products - Best offers "}>
      <img
        src={slideP}
        alt="slide-1"
        className="img"
        height={"350px"}
        width={"100%"}
      />
      <div
        className="container-fluid row mt-3 home-page"
        style={{ marginInlineStart: "50px" }}
      >
        <div className="col-md-2 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column ">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* prices filter */}
          <h4 className="text-center mt-4">Filter By Prices</h4>
          <div className="d-flex flex-column ">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column ">
            <button
              className="btn btn-danger"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset Filter
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap" style={{ marginLeft: "180px" }}>
            {noMatchingItems ? (
              <p className="text-center">No matching items found.</p>
            ) : (
              products?.map((p) => (
                <div
                  className="card m-2"
                  key={p._id}
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>

                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text"> ₹ {p.price}</p>

                    <button
                      className="btn btn-primary ms-2"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary ms-2 cart1"
                      onClick={() => addToCart(p)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
