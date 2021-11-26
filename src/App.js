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
import ProductEdit from "./components/ProductEdit";
import UserList from "./components/UserList";



 
function App(){
 
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} exact={true}/>
        <Route path="/cart" element={<Cart/>} exact={true}/>
        <Route path="/product/:id" element={<Product/>} exact={true}/>
        <Route path="/productregister" element={<ProductReg/>} exact={true}/>
        <Route path="/productedit/:id" element={<ProductEdit/>} exact={true}/>
        <Route path="/userlist" element={<UserList/>} exact={true}/>
      </Routes>
    </Router> 
    
      
    </>
  );
}

export default App;
