import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";
import ProductReg from "./components/ProductReg";
import UserList from "./components/UserList";
import UserProductList from "./components/UserProductList";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProductedit from "./components/UserProductedit";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setProducts } from "./redux/action/productAction";
import { useEffect } from "react";
import env from "./components/settings.js";



 
function App(){

  const dispatch =useDispatch();

  useEffect(async() => {
    try {
      const fetchdata = await axios.get(`${env.api}/allproducts`);
      console.log(fetchdata.data);
      let data=fetchdata.data.slice().sort((a,b)=>{ return a.price - b.price})
      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} exact={true}/>
        <Route path="/login" element={<Login/>} exact={true}/>
        <Route path="/register" element={<Register/>} exact={true}/>
        <Route path="/cart" element={<Cart/>} exact={true}/>
        <Route path="/productlist" element={<UserProductList/>} exact={true}/>
        <Route path="/userlist" element={<UserList/>} exact={true}/>
        <Route path="/product/:id" element={<Product/>} exact={true}/>
        <Route path="/productregister" element={<ProductReg/>} exact={true}/>
        <Route path="/productedit/:id" element={<UserProductedit/>} exact={true}/>
      
        
      </Routes>
    </Router> 
    
      
    </>
  );
}

export default App;
