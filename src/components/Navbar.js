import React, { useState, useEffect } from "react";
import "./Navbar.css";
import * as AiIcons from "react-icons/ai";
import { NavbarData } from "./Navbardata";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import env from "./settings";
import { removeProduct, setProducts } from "../redux/action/productAction";
import { useDispatch} from 'react-redux';
import Logo from "./images/LOGO.png" 

export default function Navbar(props) {


  const dispatch =useDispatch();
  const [cart, setcart] = useState([]);
  const Navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const addoption = window.localStorage.getItem("action");

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  const fetchcartdata = async () => {
    try {
      let getdata = await axios.get(`${env.api}/cartproducts`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      console.log(getdata);
      setcart([...getdata.data]);
    } catch (error) {}
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
    fetchcartdata();
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  let Logout = async () => {
    try {
      let check = window.confirm("Are you sure? Wanna Logout");
      if (check) {
        window.localStorage.removeItem("app_token");
        window.localStorage.removeItem("action");
        console.log("I am runned");
        Navigate("/login");
      }
    } catch (error) {
      window.alert("some thing went wrong try again");
    }
  };

  const allproduct = async () => {
    dispatch(removeProduct());
    try {
      const fetchdata = await axios.get(`${env.api}/allproducts`);
      console.log(fetchdata.data);
      let data = fetchdata.data.slice().sort((a, b) => {
        return a.price - b.price;
      });
      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navhome">
     <Link to="/" onClick={()=>{allproduct()}}><div className="App-name"><img src={Logo} alt="image"/></div></Link>
      <form className="search" onSubmit={props.search}>
        <div>
          <input
            value={props.value}
            onChange={(e) => {
              props.data(e.target.value);
            }}
            className="inputs"
            type="text"
          />
          <button type="submit">
            <BiSearchAlt2 />
          </button>
        </div>
      </form>
      {(toggleMenu || screenWidth > 1280) && (
        <ul className="list">
          {NavbarData.map((data, index) => {
            return (
              <Link
                to={data.path}
                className="items"
                onClick={toggleNav}
                key={index + 7}
              >
                {data.title}
              </Link>
            );
          })}
          <Link
            to="/cart"
            className="items"
            onClick={toggleNav}
          >{`Cart [${cart.length}]`}</Link>
          {addoption !== null ? (
            <li
              className="items"
              onClick={() => {
                Logout();
              }}
            >
              Logout
            </li>
          ) : (
            <Link to="/login" className="items" onClick={toggleNav}>
              Login
            </Link>
          )}
          {addoption == "true" ? (
            <Link to="/productlist" className="items" onClick={toggleNav}>
              Admin
            </Link>
          ) : (
            ""
          )}
        </ul>
      )}
      {!toggleMenu ? (
        <AiIcons.AiOutlineMenu onClick={toggleNav} className="btn" />
      ) : (
        <AiIcons.AiOutlineClose onClick={toggleNav} className="btn" />
      )}
    </nav>
  );
}
