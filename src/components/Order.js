import React, { useEffect, useState } from "react";
import "./Cart.css";
import env from "./settings";
import Navbar from "./Navbar";
import axios from "axios";
import Loading_page from "./Loading_page";
import { Link } from "react-router-dom";
import "./Order.css"

function Order() {
    const [Loading, setLoading] = useState(true);
    const [cart, setcart] = useState([]);
    const fetchcartdata = async () => {
        try {
          let getdata = await axios.get(`${env.api}/getorder`, {
            headers: {
              Authorization: window.localStorage.getItem("app_token"),
            },
          });
          console.log(getdata);
          setcart([...getdata.data]);
          setLoading(false);
        } catch (error) {
          console.log(error);
          window.alert("Some thing went wrong");
          setLoading(false);
        }
      };
      
      useEffect(() => {
        fetchcartdata();
      }, []);
    
    return (
        <>
      <Navbar />
      {Loading ? (
        <Loading_page />
      ) : (
        <div className="OR-overall ">
          <div className="OR-container">
            <div className="OR-gird-container2">
              
                <div>
                  <div>
                  ........ Your Orders .........
                  </div>
                  <div>
                 <Link to="/">
                         <button className="OR-buttons">Home page</button>
                </Link>
                 </div>
                </div>
            </div>
          </div>
          {cart.map((Data, index) => {
            return (
              <div className="OR-container" key={index + 3}>
                <div className="OR-gird-container">
                  <div className="OR-image-position">
                    <img
                      className="OR-image"
                      src={Data.values.image}
                      alt="image"
                    />
                  </div>
                  <div className="OR-content">
                    <div>Product Name:</div>
                    <div>{Data.values.title}</div>
                    <div>product price:</div>
                    <div>{Data.values.price}</div>
                    <div>product category:</div>
                    <div>{Data.values.category}</div>
                    <div>product status:</div>
                    <div>{Data.status}</div>
                    <div>product Address:</div>
                    <div>{Data.address}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
    )
}

export default Order
