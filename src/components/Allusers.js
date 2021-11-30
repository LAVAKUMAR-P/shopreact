import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading_page from "./Loading_page";
import Navbarns from "./Navbarns";
import env from "./settings";
import "./UserProductList.css";

function Allusers() {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const fetchdata = async () => {
    setLoading(true);
    try {
      let data = await axios.get(`${env.api}/adminusers`, {
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

  let makeadmin = async (mail) => {
      setLoading(true)
    try {
      let ok = window.confirm("Are you want make admin?");
      if (ok) {
        await axios.post(
          `${env.api}/makeadmin`,
          {
            email: mail,
          },
          {
            headers: {
              Authorization: window.localStorage.getItem("app_token"),
            },
          }
        );
        fetchdata();
        window.alert("Chaned to admin sucessfully!......");
      } else {
        window.alert("Don't worry you sucessfully canceled Make admin......");
      }
    } catch (error) {
      console.log(error);
      window.alert("Check your network");
      setLoading(false)
    }
  };

  let removeadmin = async (mail) => {
      setLoading(true)
    try {
      let ok = window.confirm("Are you want to Remove admin?");
      if (ok) {
        await axios.post(
          `${env.api}/removeadmin`,
          {
            email: mail,
          },
          {
            headers: {
              Authorization: window.localStorage.getItem("app_token"),
            },
          }
        );
        fetchdata();
        window.alert("Chaned to user sucessfully!......");
      } else {
        window.alert("Don't worry you sucessfully canceled remove admin......");
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
      window.alert("Check your network");
    }
  };

  return (
    <>
      <Navbarns />
      {Loading ? (
        <Loading_page />
      ) : (
        <div>
          <div className="US-overall">
            <h4>ALL USERS</h4>
            <div className="US-button-position">
              <Link to="/productregister">
                <button className="US-buttons">CREAT PRODUCT</button>
              </Link>
              <Link to="/productlist">
                <button className="US-buttons">ALL PRODUCTS</button>
              </Link>
              <Link to="/allorders">
                <button className="US-buttons">ALL ORDERS</button>
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

          {Data.map((data, index) => {
            return (
              <div className="US-overall" key={index}>
                <div className="US-container">
                  <div className="US-gird-container">
                    <div className="US-content">
                      <div>Name:</div>
                      <div>{data.firstName}</div>
                      <div>Email id:</div>
                      <div>{data.email}</div>
                      <div>Admin:</div>
                      <div>{data.admin ? "true" : "false"}</div>
                      <div>
                        {data.admin ? (
                          <button className="US-buttons" onClick={()=>{ removeadmin(data.email)}}>Remove Admin</button>
                        ) : (
                          <button className="US-buttons" onClick={()=>{ makeadmin(data.email)}}>Make Admin</button>
                        )}
                      </div>
                    </div>
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

export default Allusers;
