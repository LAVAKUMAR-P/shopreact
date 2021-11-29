import React, {useState, useEffect} from 'react'
import './Navbar.css'
import * as AiIcons from "react-icons/ai";
import {NavbarData} from './Navbardata';
import { BiSearchAlt2 } from "react-icons/bi";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import env from "./settings";
export default function Navbar() {
  const [cart, setcart] = useState([]);
  const Navigate=useNavigate()
  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

 const addoption=window.localStorage.getItem("action");

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  const fetchcartdata = async () => {
    try {
      let getdata = await axios.get(`${env.api}/cartproducts`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      console.log(getdata);
      setcart([...getdata.data]);
      
    } catch (error) {
     
      
    }
  };

  useEffect(() => {

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth)
    fetchcartdata();
    return () => {
        window.removeEventListener('resize', changeWidth)
    }

  }, [])

  let Logout = async () => {
    try {
      let check = window.confirm("Are you sure? Wanna Logout");
      if (check) {
        window.localStorage.removeItem("app_token");
        window.localStorage.removeItem("action");
        Navigate("/login");
      }
    } catch (error) {
  
        window.alert("some thing went wrong try again");
    }
  };

  return (
    <nav className="navhome">
      <div className="App-name">Shopping app</div>
      <form className="search">
      <div>
      <input className="inputs" type="text"/>
      <button type="submit"><BiSearchAlt2/></button>
      </div>
      </form>
      {(toggleMenu || screenWidth >1280) && (
      <ul className="list">
        {
          NavbarData.map((data,index)=>{
            return(
              <Link to={data.path} className="items" onClick={toggleNav} key={index+7}>{data.title}</Link>
            )
          })
        }
        <Link to="/cart" className="items" onClick={toggleNav} >{`Cart [${cart.length}]`}</Link>
    {
     addoption !==null ?  <Link to="/login" className="items" onClick={()=>{ Logout()}}>Logout</Link>:   <Link to="/login" className="items" onClick={toggleNav}>Login</Link>
       
    } 
    {
       addoption =="true"?  <Link to="/productlist" className="items" onClick={toggleNav}>Admin</Link>:""
    }
    </ul>
      )}
      {!(toggleMenu) ? <AiIcons.AiOutlineMenu onClick={toggleNav} className="btn"/>:<AiIcons.AiOutlineClose onClick={toggleNav} className="btn"/>}
    </nav>
  )
}
