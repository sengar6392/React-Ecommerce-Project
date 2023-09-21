import {createSlice,current } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let product = action.payload;
      let isPresent = state.cart.find((prod) => prod.id === product.id);
      if (isPresent) {
        state.cart.forEach((item) => {
          if (item.id === product.id) {
            let newAmount = item.amount + product.amount;
            item.amount = newAmount;
          }
        });
      } else {
        state.cart=[...state.cart,product];
      }
    },
    increaseQuantity: (state, action) => {
      state.cart.forEach((item) => {
        if (item.id === action.payload) {
          let newAmount = item.amount + 1;
          console.log('state.cart.item',item);
          item.amount = newAmount;
        }
      });
    },
    decreaseQuantity: (state, action) => {
      state.cart.forEach((item) => {
        if (item.id === action.payload) {
          let newAmount = item.amount - 1;
          item.amount = newAmount;
        }
      });
    },
    removeFromCart: (state, action) => {
        let filteredCart=state.cart.filter(item=>item.id!==action.payload)
        state.cart=filteredCart
    },
    clearCart: (state, action) => {
        state.cart=[]
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
