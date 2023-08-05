import { useEffect } from "react";
import { products } from "../../data";
import { filterProducts } from "../actions";
import { useSelector } from "react-redux";

const featureProducts = products.filter((ele) => ele.featured === true);
const getUniqueData = (data, property) => {
  let uniqueData;
  uniqueData = data.map((ele) => {
    return ele[property];
  });
  if (property === "colors") {
    uniqueData = uniqueData.flat();
  }
  if (property === "price") return uniqueData;
  uniqueData = ["All", ...new Set(uniqueData)];
  return uniqueData;
};

const categoryData = getUniqueData(products, "category");
const companyData = getUniqueData(products, "company");
const colorsData = getUniqueData(products, "colors");
const priceData = getUniqueData(products, "price");
const maxPrice = Math.max(...priceData);
const minPrice = Math.min(...priceData);

const initialState = {
  products: products,
  featureProducts: featureProducts,
  singleProduct: {},
  gridView: true,
  filterProducts: products,
  categoryData,
  companyData,
  colorsData,
  maxPrice,
  minPrice,
  filters: {
    category: "All",
    company: "All",
    colors: "All",
    price: maxPrice,
  },
};
export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SINGLE_PRODUCT":
      return {
        ...state,
        singleProduct: action.payload,
      };
    case "SET_VIEW":
      return {
        ...state,
        gridView: action.payload,
      };
    case "SORT_PRODUCTS":
      let filter_products;
      if (action.payload === "lowest") {
        filter_products = state.filterProducts.sort(
          (a, b) => a.price - b.price
        );
      }
      if (action.payload === "highest") {
        filter_products = state.filterProducts.sort(
          (a, b) => b.price - a.price
        );
      }
      if (action.payload === "a-z") {
        filter_products = state.filterProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (action.payload === "z-a") {
        filter_products = state.filterProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      return {
        ...state,
        filterProducts: [...filter_products],
      };
    case "SEARCH_PRODUCTS":
      const userInput = action.payload;
      const searchList = state.products.filter((prod) =>
        prod.name.toLowerCase().includes(userInput)
      );
      // console.log(filteredList)
      return {
        ...state,
        filterProducts: [...searchList],
      };
    case "SET_FILTERS":
      const { filterName, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [filterName]: value,
        },
      };

    case "FILTER_PRODUCTS":
      const { category, company, colors, price } = state.filters;
      let filteredList = [...state.products];
      if (category !== "All") {
        filteredList = filteredList.filter(
          (prod) => prod.category === category
        );
      }
      if (company !== "All") {
        filteredList = filteredList.filter((prod) => prod.company === company);
      }
      if (colors !== "All") {
        filteredList = filteredList.filter((prod) =>
          prod.colors.includes(colors)
        );
      }
      filteredList = filteredList.filter((prod) => prod.price <= price);
      return {
        ...state,
        filterProducts: filteredList,
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          category: "All",
          company: "All",
          colors: "All",
          price: maxPrice,
        },
      };
    default:
      return state;
  }
};

// const getCartLocalData=()=>{
//   let cartLocalData=localStorage.getItem("cartLocalStorage");
//   console.log('cartLocalData',cartLocalData);
//   if(cartLocalData===[]){
//     return [];

//   }
//   else {
//     return JSON.parse(cartLocalData);
//   }
// }

const cartInitialState={
  cart: []
}
export const cartReducer=(state=cartInitialState,action)=>{
  switch(action.type){
    case "ADD_TO_CART":
      let product=action.payload
      let isPresent=state.cart.find(prod=>prod.id===product.id)
      if(isPresent){
        const updatedCart=state.cart.map((item)=>{
          if(item.id===product.id){
            let newAmount=item.amount+product.amount
            return{
              ...item,
              amount:newAmount
            }
          }
          else{
            return item
          }
        })
        return{
          ...state,
          cart:updatedCart
        }
      }
      else{
        return{
          ...state,
          cart:[...state.cart,product]
        }
      }
    case "INCREASE_QUANTITY":
      const updatedList=state.cart.map((item)=>{
        if(item.id===action.payload){
          let newAmount=item.amount+1
          return{
            ...item,
            amount:newAmount
          }
        }
      })
      return{
        ...state,
          cart:updatedList
      }
      case "DECREASE_QUANTITY":
        const updatedList2=state.cart.map((item)=>{
          if(item.id===action.payload){
            let newAmount=item.amount-1
            return{
              ...item,
              amount:newAmount
            }
          }
        })
        return{
          ...state,
            cart: updatedList2
        }
    case "REMOVE_FROM_CART":
      const updatedCart=state.cart.filter(item=>item.id!==action.payload)
      return{
        ...state,
        cart: updatedCart
      }
    case "CLEAR_CART":
      return{
        ...state,
        cart:[]
      }
    default:
      return state
  }
}

