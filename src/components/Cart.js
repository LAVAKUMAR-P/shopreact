import React, { useEffect, useState } from "react";
import "./Cart.css";
import env from "./settings";
import Navbar from "./Navbar";
import axios from "axios";
import Loading_page from "./Loading_page";
import { Link } from "react-router-dom";
function Cart() {
  let totel = 0;
  const [Loading, setLoading] = useState(true);
  const [cart, setcart] = useState([]);
  
  const fetchcartdata = async () => {
    try {
      let getdata = await axios.get(`${env.api}/cartproducts`, {
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

  const Increment = async (id) => {
    setLoading(true);
    try {
      let getdata = await axios.put(
        `${env.api}/increasevalue/${id}`,
        { increment: 1 },
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      fetchcartdata();
    } catch (error) {
      console.log(error);
      window.alert("Some thing went wrong");
      setLoading(false);
    }
  };

  const Decrement = async (id,count) => {
    if(count>1){
      setLoading(true);
    try {
      let getdata = await axios.put(
        `${env.api}/decreasevalue/${id}`,
        { Decrement: 1 },
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      fetchcartdata();
    } catch (error) {
      console.log(error);
      window.alert("Some thing went wrong");
      setLoading(false);
    }
    }else{
      window.alert("You can only remove product")
    }
    
  };

  useEffect(() => {
    fetchcartdata();
  }, []);

  const Removecart = async (product) => {
    setLoading(true);
    try {
      let ok = window.confirm("Are you want to delete product?");
      if (ok) {
        let deleteproduct = await axios.delete(
          `${env.api}/cartproductdelete/${product}`,
          {
            headers: {
              Authorization: window.localStorage.getItem("app_token"),
            },
          }
        );

        window.alert("Deleted sucessfully");
        fetchcartdata();
      } else {
        window.alert("Canceled");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      window.alert("Something went wrong");
    }
  };

  const Order=async()=>{
    try {
      let postData = await axios.post(
        `${env.api}/orderproduct`,{ Order: "All in my cart" },
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      window.alert("Product Ordered");
      fetchcartdata();
    } catch (error) {
      if (error.message === "Request failed with status code 409") {
        window.alert("Mailid is already registered");
        console.log(error);
      } else {
        window.alert("check your network");
        console.log(error);
      }
    }
  }

  if (!Loading) {
    cart.map((data) => {
      return (totel = data.values.price * data.values.count + totel);
    });
  }

  return (
    <>
      <Navbar />
      {Loading ? (
        <Loading_page />
      ) : (
        <div className="CT-overall ">
          <div className="CT-container">
            <div className="CT-gird-container2">
              {cart.length > 0 ? (
                <>
                  {" "}
                  <div>
                    Totel amount:<span>{totel}</span>
                    <div>
                <button className="CT-buttons" onClick={()=>{Order()}}>ORDER PRODUCT</button>
                 </div>
                  </div>
                </>
              ) : (
                <div>
                  <div>
                  ........ cart is empty .........
                  </div>
                  <div>
                    <Link to="/">
                         <button className="CT-buttons">Home page</button>
                </Link>
                 </div>
                </div>
              )}
              
            </div>
          </div>
          {cart.map((Data, index) => {
            return (
              <div className="CT-container" key={index + 3}>
                <div className="CT-gird-container">
                  <div className="CT-image-position">
                    <img
                      className="CT-image"
                      src="https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="CT-content">
                    <div>Product Name:</div>
                    <div>{Data.values.title}</div>
                    <div>product price:</div>
                    <div>{Data.values.price}</div>
                    <div>product category:</div>
                    <div>{Data.values.price}</div>
                    <div>
                      <button
                        className="CT-buttons"
                        onClick={() => {
                          Increment(Data._id);
                        }}
                      >
                        +
                      </button>
                      <span>{Data.values.count}</span>
                      <button
                        className="CT-buttons"
                        onClick={() => {
                          Decrement(Data._id,Data.values.count);
                        }}
                      >
                        -
                      </button>
                    </div>
                    <button
                      className="CT-buttons"
                      onClick={() => {
                        Removecart(Data._id);
                      }}
                    >
                      REMOVER PRODUCT
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Cart;
