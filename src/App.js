import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";


 
function App(){
 
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} exact={true}/>
        <Route path="/cart" element={<Cart/>} exact={true}/>
        <Route path="/product/:id" element={<Product/>} exact={true}/>
      </Routes>
    </Router> 
    
      
    </>
  );
}

export default App;
