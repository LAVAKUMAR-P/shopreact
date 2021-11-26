import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbarns from './Navbarns';
import env from "./settings";

function UserProductList() {
    const [Data, setData] = useState([])
    const fetchdata=async()=>{
        try {
            let data=await axios.get(`${env.api}/allproducts`)
            console.log(data);
            setData([...data.data])
        } catch (error) {
            console.log(error);
            window.alert("Check your network")
        }
    }
    useEffect(()=>{
        fetchdata();
    },[])
    return (
        <>
        <Navbarns/>
        {
            Data.length > 0 ? Data.map((data)=>{
                return(
                    <div className="CT-overall">
            <div className="CT-container">
                <div className="CT-gird-container">
                  <div className="CT-image-position">
                    <img
                      className="CT-image"
                      src={data.image}
                      alt="image"
                    />
                  </div>
                  <div className="CT-content">
                    <div>Product Name:</div>
                    <div>{data.title}</div>
                    <div>product price:</div>
                    <div>{data.price}</div>
                    <div>product category:</div>
                    <div>{data.category}</div>
                    <div>
                    <button className="CT-buttons">EDIT</button>
                    
                    <button className="CT-buttons">DELETE</button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
                )
            }):""
        }
        </>
    )
}

export default UserProductList
