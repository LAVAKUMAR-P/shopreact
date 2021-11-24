import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectProduct } from "../redux/action/productAction";
import Navbar from "./Navbar";
import "./Product.css";

function Product() {
  const [Loading, setLoading] = useState(false);
  const dispach = useDispatch();
  const { id } = useParams();
  const fetchdata = async (id) => {
    try {
      let getdata = await axios.get(`https://fakestoreapi.com/products/${id}`);

      dispach(selectProduct(getdata.data));
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata(id);
  }, []);
  const product = useSelector((state) => {return state.product;});

  console.log(product);
  return (
    <>
      <Navbar />
      {Loading ? (
        <div className="PT-container-position">
          <div className="PT-container">
            <div className="PT-gird-container">
              <div className="PT-image-position">
                <img
                  className="PT-image"
                  src={product.image}
                  alt="image"
                />
              </div>
              <div className="PT-content">
                <div>Product Name:</div>
                <div>{product.title}</div>
                <br/>
                <div>product Description:</div>
                
                <div>
                 {product.description}
                </div>
                <br/>
                <div>product price:</div>
                <div>{product.price}</div>
                <div>product category:</div>
                <div>{product.category}</div>
                <button className="PT-buttons">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h5>Loading...................................</h5>
      )}
    </>
  );
}

export default Product;
