import React, { useState } from "react";
import FormatPrice from "../Helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

const CartItem = ({ id, title, image, price, amount, max }) => {
  const dispatch = useDispatch();
  const setDecrease = () => {
    if (amount > 1) dispatch(decreaseQuantity(id));
  };
  const setIncrease = () => {
    if (amount >= max) {
      swal("Not more items can be added");
    } else {
      dispatch(increaseQuantity(id));
    }
  };
  const removeItem = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>
        <div>
          <p>{title}</p>
          <div className="color-div">
            <p>color:</p>
            {/* <div
              className="color-style"
              style={{ backgroundColor: color, color: color }}
            ></div> */}
          </div>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={() => setDecrease(id)}
        setIncrease={() => setIncrease(id)}
      />

      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </div>

      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem()} />
      </div>
    </div>
  );
};

export default CartItem;
