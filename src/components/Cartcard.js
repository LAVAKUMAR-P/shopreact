import React, { useReducer } from 'react'

const reducer=(state,action)=>{
switch (action.type) {
    case "INCREMENT":
        
     return state+1;
     case "DECREMENT":
     if(state>1){
        return state-1;
     }   
     else{
        return state
     }
    default:
       return state;
}
}

function Cartcard() {
    const[state,dispach]=useReducer(reducer,0)

    return (
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
                <button className="CT-buttons" onClick={()=>{dispach({type:"INCREMENT"})}}>+</button>
                <span>{state}</span>
                <button className="CT-buttons"onClick={()=>{dispach({type:"DECREMENT"})}}>-</button>
                </div>
              </div>
            </div>
          </div>
    )
}

export default Cartcard
