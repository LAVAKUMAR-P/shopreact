import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading_page from "./Loading_page";
import Navbarns from "./Navbarns";
import env from "./settings";
import "./UserProductList.css"

function Allorders() {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const fetchdata = async () => {
    setLoading(true);
    try {
      let data = await axios.get(`${env.api}/adminorders`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      console.log(data);
      setData([...data.data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      window.alert("Check your network");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
   
  return (
    <>
      <Navbarns />
{ Loading? <Loading_page/>:
  <div>
  <div className="US-overall">
        <h4>ALL ORDERS</h4>
        <div className="US-button-position">
        <Link to="/productregister">
          <button className="US-buttons">CREAT PRODUCT</button>
        </Link>
        <Link to="/productlist">
          <button className="US-buttons">ALL PRODUCTS</button>
        </Link>
        <Link to="/allusers">
          <button className="US-buttons">ALL USERS</button>
        </Link>
        </div>
        <div className="US-container">
          <div className="US-gird-container">
            <div className="US-content">
              <h5>TOTEL NO DATA</h5>
              <h5>{Data.length}</h5>
            </div>
          </div>
        </div>
      </div>

      { Data.map((data, index) => {
        return (
          <div className="US-overall" key={index}>
            <div className="US-container">
              <div className="US-gird-container">
                <div className="US-image-position">
                  <img
                    className="US-image"
                    src={data.values.image}
                    alt="image"
                  />
                </div>
                <div className="US-content">
                  <div>Product Name:</div>
                  <div>{data.values.title}</div>
                  <div>Product id:</div>
                  <div>{data.cartid}</div>
                  <div>product price:</div>
                  <div>{data.values.price}</div>
                  <div>product count:</div>
                  <div>{data.values.count}</div>
                  <div>Address:</div>
                  <div>{data.address}</div>
                  <div>Status:</div>
                  <div>{data.status}</div>
                  <div>
                      <Link to={`/orderedit/${data._id}`}>
                    <button
                      className="US-buttons"
                    >
                      UPDATE
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      )}
      </div>
}
      
    </>
  );
}

export default Allorders
