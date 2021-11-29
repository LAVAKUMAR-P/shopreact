import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { selectProduct } from "../redux/action/productAction";
import Loading_page from "./Loading_page";
import Navbarns from "./Navbarns";
import "./Product.css";
import env from "./settings";

function Product() {
  const [Loading, setLoading] = useState(true);
  const [cart,setcart]=useState([])
  const dispach = useDispatch();
  const Navigate=useNavigate();
  const { id } = useParams();
  const fetchdata = async (id) => {
    try {
      setLoading(true);
      let getdata = await axios.get(`${env.api}/getproductbyid/${id}`,{
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });

      dispach(selectProduct(getdata.data));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      window.alert("Check your network");
    }
  };
  const fetchcartdata = async () => {
    try {
      setLoading(true);
      let getdata = await axios.get(`${env.api}/cartproducts`,{
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      })
     
     setcart([...getdata.data])
     setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchdata(id);
    fetchcartdata();
  }, []);
  const product = useSelector((state) => {return state.product;});
 

const Addtocart=async(product)=>{
  console.log(product);
  let ok = window.localStorage.getItem("app_token");
  try {
    if(ok){
      let getdata = await axios.post(`${env.api}/addtocart`,{values : product},{
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      })
     
      setLoading(true);
      window.alert("Added sucessfully");
      Navigate("/cart");
    }
    else{
      window.alert("kindly Login")
    }
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
    if(obj.cartid === product._id)
    {
      let id=obj._id;
      Removecart(id)
    }
  })
}


  return (
    <>
      <Navbarns/>
      {Loading ? (
        <Loading_page/>
      ) :  (product._id !== undefined ) ?
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
                  cart.some((obj) => obj.cartid === product._id) ? <button className="PT-buttons" onClick={()=>{Removecartid(product._id)}}>Remove from cart</button>:<button className="PT-buttons" onClick={()=>{Addtocart(product._id)}}>Add to Cart</button>
                }

              </div>
            </div>
          </div>
        </div>
      :<h5>Some thing went wrong kindly refresh page</h5> }
    </>
  );
}

export default Product;
