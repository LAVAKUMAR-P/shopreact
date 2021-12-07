import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import Navbar from "./Navbar";
import "./Home.css";
import axios from "axios";
import env from "./settings";
import {
  removeProduct,
  setProducts,
} from "../redux/action/productAction";
import Bbar from "./Bbar";
import { MdShortText } from "react-icons/md";
import Loading_page from "./Loading_page";

function Home() {
  const [search, setsearch] = useState("");
  const [data, setdata] = useState([]);


  const handleSearch = (searchValue) => {
    setsearch(searchValue);
  };
  
  const dispatch = useDispatch();

  const searchData = async (e) => {
    e.preventDefault();
    try {
      const searchdata = await axios.get(`${env.api}/searchproduct/${search}`);
      console.log(searchdata);
      dispatch(removeProduct());
      dispatch(setProducts(searchdata.data));
    } catch (error) {
      console.log(error);
    }
  };

  const products = useSelector((state) => state.allproducts.products);
  const isLoading = useSelector((state) => state.Loading);


  const filteraction=async (e)=>{
    e.preventDefault()
    let value=e.target.value
    if (data.length > 0) {
      
      if (value == "min") {
        let sortdata = products.slice().sort((a, b) => {
          return a.values.price - b.values.price;
        });
        setdata([...sortdata]);
     
      }
       if (value == "max") {
        let sortdata = products.slice().sort((a, b) => {
          return b.values.price - a.values.price;
        });
        
        setdata([...sortdata]);
      } 
    }
   
  }


  useEffect(() => {
    setdata([...products]);
  }, [products]);
  
  return (
    <div className="overall-container">
      <Navbar data={handleSearch} value={search} search={searchData} />
      
      <div className="H-fullpage">
      <h6>HI I am{process.env.secret}</h6>
          {isLoading ?  (
           <Loading_page/>
          ):data.length >0 ? (
            <section>
              
             <div className="H-filter">
              
             
             
             <span className="H-filter-icon">
             <MdShortText/>
             </span>
           
             <select onChange={(e)=>{filteraction(e)}} className="H-filter-drop" required={true}>
               
             <option id="filter" className="H-filter-drop">Select one</option>
               <option  value="max">Maximum to minimum</option>
               <option  value="min">Minimum to maximum</option>
             </select>
             
           </div>
           <div className="H-Card-gird">
              {data.map((data, index) => {
                return <Card Data={data} key={index} />;
              })}
              </div>
           </section>
            ):<h5>No data found</h5> }
         
        
      </div>
      <Bbar />
    </div>
  );
}

export default Home;
