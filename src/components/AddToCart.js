import React, { useEffect } from "react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";
import CartAmountToggle from "./CartAmountToggle";
import { Button } from "../styles/Button";
import swal from 'sweetalert';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";

const AddToCart = ({ product }) => {
  const {cart}=useSelector(state=>state.cartReducer)
  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart))
    console.log('added to local storage');
  },[cart])
  const { id, stock,title,images ,price} = product;
  const [amount, setAmount] = useState(1);
  const dispatch=useDispatch()

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    if(amount>=stock){
        swal("Not more items can be added");
        setAmount(stock)
    }
    else{
      setAmount(amount + 1)
    }
  };
  const itemAddedAlert=()=>{
    swal({
        title: "DONE",
        text: "Product added to Cart",
        icon: "success",
        button: "OK",
      });
  }
  const addToCartHandler=()=>{
    let limitExceeding=false;
    for(let i=0;i<cart.length;i++){
      if(cart[i].id===product.id+title){
        let newAmount=cart[i].amount+amount
        if(newAmount>stock){
          limitExceeding=true

        }
      }
    }
    if(limitExceeding){
      swal("Not more items can be added");
    }
    else{
      const product={
        amount,
        id:id+title,
        image:images[0],
        max:stock,
        title,
        price
      }
      dispatch(addToCart(product))
      itemAddedAlert()

    }
  }
  
  return (
    <Wrapper>
      {/* <div className="colors">
        <p>
          Color:
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: color }}
                className={color === curColor ? "btnStyle active" : "btnStyle"}
                onClick={() => setCurColor(color)}
              >
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </p>
      </div> */}
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />

      {/* <NavLink to="/cart"> */}
        <Button className="btn" onClick={()=>addToCartHandler()}>Add To Cart</Button>
        
      {/* </NavLink> */}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
    padding: 2px;
  }

  .checkStyle {
    color: #fff;
    font-size: large;
    padding-left: 0;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;

export default AddToCart;
