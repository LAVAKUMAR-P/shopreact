import React from 'react';
import { Link } from 'react-router-dom';
import "./Card.css"

function Card({Data}){
   console.log(Data);
return(
    <Link to={`/product/${Data.id}`} >
    <div className="H-container">
        <div>
        <img src={Data.image} alt="image" className="C-image"/>
        </div>
        <div className="C-title">{Data.title}</div>
        <div className="Card-content">
            <div>Category: </div>
            <div>{Data.category}</div>
            <div>price:</div>
            <div>{Data.price}</div>
        </div>
    </div>
    </Link>
);
}

export default Card;