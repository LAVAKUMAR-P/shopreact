import React from 'react'
import "./Cart.css"
import Cartcard from './Cartcard'
import Navbar from './Navbar'

function Cart() {
    
    return (
        <>
        <Navbar/>
        <div className="CT-overall">
        <div className="CT-gird-container">
            
              <div className="CT-content">
                <div>Totel:</div>
                <div>......................</div>
              </div>
            </div>
          
          <Cartcard/>

          </div>
        </>
      )
}

export default Cart
