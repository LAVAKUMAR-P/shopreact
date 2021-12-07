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
import { setFalseLoading, setProducts } from "./redux/action/productAction";
import { useEffect } from "react";
import env from "./components/settings.js";
import Order from "./components/Order";
import Allorders from "./components/Allorders";
import Allusers from "./components/Allusers";
import Orderedit from "./components/Orderedit";
import Address from "./components/Address";
import Editaddress from "./components/Editaddress";
import Forgotpassword from "./components/Forgotpassword";
import Resetpassword from "./components/Resetpassword";



 
function App(){

  const dispatch =useDispatch();

  useEffect(async() => {
    try {
      const fetchdata = await axios.get(`${env.api}/allproducts`);
      dispatch(setProducts(fetchdata.data));
      dispatch(setFalseLoading())
    } catch (error) {
      console.log(error);
      window.alert("something went wrong check your network")
      dispatch(setFalseLoading())
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
        <Route path="/order" element={<Order/>} exact={true}/>
        <Route path="/cart" element={<Cart/>} exact={true}/>
        <Route path="/address" element={<Address/>} exact={true}/>
        <Route path="/allorders" element={<Allorders/>} exact={true}/>
        <Route path="/allusers" element={<Allusers/>} exact={true}/>
        <Route path="/editaddress" element={<Editaddress/>} exact={true}/>
        <Route path="/productlist" element={<UserProductList/>} exact={true}/>
        <Route path="/userlist" element={<UserList/>} exact={true}/>
        <Route path="/forgetpassword" element={<Forgotpassword/>} exact={true}/>
        <Route path="/resetpassword/:userId/:token" element={<Resetpassword/>} exact={true}/>
        <Route path="/product/:id" element={<Product/>} exact={true}/>
        <Route path="/orderedit/:id" element={<Orderedit/>} exact={true}/>
        <Route path="/productregister" element={<ProductReg/>} exact={true}/>
        <Route path="/productedit/:id" element={<UserProductedit/>} exact={true}/>
      
        
      </Routes>
    </Router> 
    
      
    </>
  );
}

export default App;
