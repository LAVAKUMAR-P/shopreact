import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import Navbar from './Navbar';
import "./Home.css"
import axios from 'axios';
import env from "./settings";
import { removeProduct, setProducts } from '../redux/action/productAction';



function Home() {
  const [search,setsearch]=useState("");
  const [Allresult,setAllresult]=useState(false);
  const dispatch =useDispatch();
  
   const searchData=async(e)=>{
    e.preventDefault();
    try {
      const searchdata = await axios.get(`${env.api}/searchproduct/${search}`);
      console.log(searchdata);
      dispatch(removeProduct())
      dispatch(setProducts(searchdata.data))
      setAllresult(true)
    } catch (error) {
      console.log(error);
    }
   }
  

   const allproduct=async()=>{
    dispatch(removeProduct())
    try {
      const fetchdata = await axios.get(`${env.api}/allproducts`);
      console.log(fetchdata.data);
      let data=fetchdata.data.slice().sort((a,b)=>{ return a.price - b.price})
      dispatch(setProducts(data));
      setAllresult(false);
    } catch (error) {
      console.log(error);
    }
  }
   
    const products = useSelector((state) => state.allproducts.products);
    
    return (
        <div className="H-fullpage">
            <Navbar data={setsearch} value={search} search={searchData}/>
            <h1>{search} THis is search</h1>
            <div className="H-Card-gird">
              {
                products.length >0  ? products.map((data,index)=>{return(<Card Data={data} key={index} />)}):<h5>Loading......</h5>
              }
                
            </div>
           {
              Allresult ? <div className="allproductbtn-position">
              <button class="allproductbtn" onClick={()=>{allproduct()}}>Refresh</button>
              </div>:""
           } 
        </div>
    )
}

export default Home

