import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card({ Data}) {
  return (
    <Link to={`/product/${Data._id}`}>
      <div className="H-container">
        <div>
          <img src={Data.values.image} alt="image" className="C-image" />
        </div>
        <div className="C-title">{Data.values.title}</div>
        <div className="Card-content">
          <div>Category: </div>
          <div>{Data.values.category}</div>
          <div>price:</div>
          <div>₹ {Data.values.price}</div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
