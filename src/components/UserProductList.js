import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbarns from "./Navbarns";
import env from "./settings";

function UserProductList() {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const fetchdata = async () => {
    try {
      let data = await axios.get(`${env.api}/allproducts`);
      console.log(data);
      setData([...data.data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      window.alert("Check your network");
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
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
      <div className="CT-overall">
      <h4>ALL PRODUCTS</h4>
      <Link to="/productregister">
        <button className="CT-buttons">
          CREAT PRODUCT
        </button>
        </Link>
        <div className="CT-container">
          <div className="CT-gird-container">
            <div className="CT-content">
              <h5>TOTEL NO DATA</h5>
              <h5>{Data.length}</h5>
            </div>
          </div>
        </div>
      </div>

      {Loading ? (
        <h5>Loading</h5>
      ) : (
        Data.map((data, index) => {
          return (
            <div className="CT-overall" key={index}>
              <div className="CT-container">
                <div className="CT-gird-container">
                  <div className="CT-image-position">
                    <img
                      className="CT-image"
                      src={data.values.image}
                      alt="image"
                    />
                  </div>
                  <div className="CT-content">
                    <div>Product Name:</div>
                    <div>{data.values.title}</div>
                    <div>product price:</div>
                    <div>{data.values.price}</div>
                    <div>product category:</div>
                    <div>{data.values.category}</div>
                    <div>
                      <Link to={`/productedit/${data._id}`}>
                        <button className="CT-buttons">EDIT</button>
                      </Link>

                      <button
                        className="CT-buttons"
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
        })
      )}
    </>
  );
}

export default UserProductList;
