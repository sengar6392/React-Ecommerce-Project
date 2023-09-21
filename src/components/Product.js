import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";
import { useDispatch } from "react-redux";

const Product = ({item}) => {
  const dispatch=useDispatch();
  const { id, title, thumbnail, price, category } = item;
  return (
    <NavLink to={`/singleproduct/${id}`}>
      <div className="card">
        <figure>
          <img src={thumbnail} alt={title} />
          <figcaption className="caption">{category}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{title}</h3>
            <p className="card-data--price">{<FormatPrice price={price}/>}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;