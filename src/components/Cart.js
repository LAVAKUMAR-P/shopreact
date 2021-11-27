import React from 'react'
import "./Cart.css"

import Navbar from './Navbar'

function Cart() {
    
    return (
        <>
        <Navbar/>
        <div className="CT-overall /addtocart">
        <div className="CT-gird-container">
            
              <div className="CT-content">
                <div>Totel:</div>
                <div>......................</div>
              </div>
            </div>
          
            <div className="CT-container">
            <div className="CT-gird-container">
              <div className="CT-image-position">
                <img
                  className="CT-image"
                  src="https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
                  alt="image"
                />
              </div>
              <div className="CT-content">
                <div>Product Name:</div>
                <div>......................</div>
                <div>product price:</div>
                <div>.....................</div>
                <div>product category:</div>
                <div>.................................</div>
                <div>
                <button className="CT-buttons">+</button>
                <span>state</span>
                <button className="CT-buttons">-</button>
                </div>
              </div>
            </div>
          </div>

          </div>
        </>
      )
}

export default Cart
