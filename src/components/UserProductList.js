import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Loading_page from "./Loading_page";
import Navbarns from "./Navbarns";
import env from "./settings";
import "./UserProductList.css"

function UserProductList() {
  const Navigate=useNavigate()
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  let Logout = () => {
    
        window.localStorage.removeItem("app_token");
        window.localStorage.removeItem("action");
        Navigate("/");
  };

  const fetchdata = async () => {
    setLoading(true);
    try {
      let data = await axios.get(`${env.api}/allproductsbyadmin`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        }});
    
      setData([...data.data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if(error.message == "Request failed with status code 401"){
        window.alert("You are not allowed to come here")
        Logout();
      }else{
        window.alert("Check your network");
        setLoading(false);
      }
     
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const Deletedata = async (id) => {
    try {
      let confirm = window.confirm("Are you want to Delete data?");
      if (confirm) {
        let data = await axios.delete(`${env.api}/productdelete/${id}`, {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        });
        window.alert("Deleted");
        fetchdata();
      } else {
        window.alert("Canceled");
      }
    } catch (error) {
      console.log(error);
      window.alert("Check your network");
    }
  };

  return (
    <>
      <Navbarns />
{ Loading? <Loading_page/>:
  <div>
  <div className="US-overall">
        <h4>ALL PRODUCTS</h4>
        <div className="US-button-position">
        <Link to="/productregister">
          <button className="US-buttons">CREAT PRODUCT</button>
        </Link>
        <Link to="/allorders">
          <button className="US-buttons">ALL ORDERS</button>
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
                  <div>product price:</div>
                  <div>{data.values.price}</div>
                  <div>product category:</div>
                  <div>{data.values.category}</div>
                  <div>
                    <Link to={`/productedit/${data._id}`}>
                      <button className="US-buttons">EDIT</button>
                    </Link>

                    <button
                      className="US-buttons"
                      onClick={() => {
                        Deletedata(data._id);
                      }}
                    >
                      DELETE
                    </button>
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

export default UserProductList;
