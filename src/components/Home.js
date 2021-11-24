import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import Navbar from './Navbar';
import "./Home.css"
import axios from 'axios';
import { setProducts } from '../redux/action/productAction';



function Home() {
  const [display,setdisplay]=useState();
  const dispatch =useDispatch();
   
  useEffect(async() => {
    try {
      const fetchdata = await axios.get(`https://fakestoreapi.com/products`);
      console.log(fetchdata.data);
      let data=fetchdata.data.slice().sort((a,b)=>{ return a.price - b.price})
      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
   
    const products = useSelector((state) => state.allproducts.products);
    
    return (
        <div>
            <Navbar/>
            <div className="H-Card-gird">
              {
                products.length >0  ? products.map((data)=>{return(<Card Data={data} />)}):<h5>Loading......</h5>
              }
            
            </div>
        </div>
    )
}

export default Home

