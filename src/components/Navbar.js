import React, {useState, useEffect} from 'react'
import './Navbar.css'
import * as AiIcons from "react-icons/ai";
import {NavbarData} from './Navbardata';
import { BiSearchAlt2 } from "react-icons/bi";
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

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
    {
     addoption !==null ?  <Link to="/login" className="items" onClick={toggleNav}>Logout</Link>:   <Link to="/login" className="items" onClick={toggleNav}>Login</Link>
       
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
