import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import Navbar from './Navbar';
import "./Home.css"
import axios from 'axios';
import { setProducts } from '../redux/action/productAction';



function Home() {
  const [display,setdisplay]=useState();
  
   
  
   
    const products = useSelector((state) => state.allproducts.products);
    
    return (
        <div>
            <Navbar/>
            <div className="H-Card-gird">
              {
                products.length >0  ? products.map((data,index)=>{return(<Card Data={data} key={index} />)}):<h5>Loading......</h5>
              }
            
            </div>
        </div>
    )
}

export default Home

