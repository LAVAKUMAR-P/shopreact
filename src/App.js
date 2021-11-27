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



 
function App(){
 
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
