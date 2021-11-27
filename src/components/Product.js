import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectProduct } from "../redux/action/productAction";
import Navbar from "./Navbar";
import "./Product.css";
import env from "./settings";

function Product() {
  const [Loading, setLoading] = useState(false);
  const [cart,setcart]=useState([])
  const dispach = useDispatch();
  
  const { id } = useParams();
  const fetchdata = async (id) => {
    try {
      let getdata = await axios.get(`${env.api}/getproductbyid/${id}`,{
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });

      dispach(selectProduct(getdata.data));
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchcartdata = async () => {
    try {
      let getdata = await axios.get(`${env.api}/cartproducts`,{
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      })
     
     setcart([...getdata.data])
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata(id);
    fetchcartdata();
  }, []);
  const product = useSelector((state) => {return state.product;});
 

const Addtocart=async(product)=>{
  try {
    let getdata = await axios.post(`${env.api}/addtocart`,{values : product},{
      headers: {
        Authorization: window.localStorage.getItem("app_token"),
      },
    })
   
    setLoading(true);
    window.alert("Added sucessfully");
    fetchcartdata();
    fetchdata(id);
  } catch (error) {
    console.log(error);
    window.alert("Something went wrong");
  }
}

const Removecart=async(product)=>{
  try {
    let ok=window.confirm("Are you want to delete product?")
    if(ok){
      let deleteproduct = await axios.delete(`${env.api}/cartproductdelete/${product}`,{
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      })
      setLoading(true);
      window.alert("Deleted sucessfully");
      fetchcartdata();
      fetchdata(id);
    }
    else{
      window.alert("Canceled")
    }
  } catch (error) {
    console.log(error);
    window.alert("Something went wrong");
  }
}

const Removecartid=()=>{
  cart.map((obj) =>{
    if(obj.values.cartid === product._id)
    {
      let id=obj._id;
      Removecart(id)
    }
  })
}


  return (
    <>
      <Navbar />
      {Loading ? (
        <div className="PT-container-position">
          <div className="PT-container">
            <div className="PT-gird-container">
              <div className="PT-image-position">
                <img
                  className="PT-image"
                  src={product.values.image}
                  alt="image"
                />
              </div>
              <div className="PT-content">
                <div>Product Name:</div>
                <div>{product.values.title}</div>
                <br/>
                <div>product Description:</div>
                
                <div>
                 {product.values.description}
                </div>
                <br/>
                <div>product price:</div>
                <div>{product.values.price}</div>
                <div>product category:</div>
                <div>{product.values.category}</div>
                {
                  cart.some((obj) => obj.values.cartid === product._id) ? <button className="PT-buttons" onClick={()=>{Removecartid(product._id)}}>Remove from cart</button>:<button className="PT-buttons" onClick={()=>{Addtocart(product._id)}}>Add to Cart</button>
                }

              </div>
            </div>
          </div>
        </div>
      ) : (
        <h5>Loading...................................</h5>
      )}
    </>
  );
}

export default Product;
