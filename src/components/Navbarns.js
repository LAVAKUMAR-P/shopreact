import React, {useState, useEffect} from 'react'
import './Navbarns.css'
import * as AiIcons from "react-icons/ai";
import {NavbarData} from './Navbardata';
import { BiSearchAlt2 } from "react-icons/bi";
import { Link ,useNavigate} from 'react-router-dom';
import Logo from "./images/LOGO.png" 
export default function Navbarns() {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const Navigate=useNavigate()


 const addoption=window.localStorage.getItem("action");

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  useEffect(() => {

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth)

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
    <nav className="navhome1">
          <Link to="/"><div className="App-name"><img src={Logo} alt="image"/></div></Link>
      {(toggleMenu || screenWidth >1280) && (
      <ul className="list1">
        {
          NavbarData.map((data,index)=>{
            return(
              <Link to={data.path} className="items" onClick={toggleNav} key={index+7}>{data.title}</Link>
            )
          })
        }
                <Link to="/cart" className="items" onClick={toggleNav} >Cart</Link>
    {
     addoption !==null ?  <li className="items" onClick={()=>{ Logout()}}>Logout</li>:   <Link to="/login" className="items" onClick={toggleNav}>Login</Link>
       
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
