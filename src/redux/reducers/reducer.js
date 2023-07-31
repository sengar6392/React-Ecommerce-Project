import { products } from "../../data"
const featureProducts=products.filter((ele)=>ele.featured===true)
const initialState={
    products:products,
    featureProducts:featureProducts,
    singleProduct:{},
    gridView:true,
    filterProducts:products
}
export const productsReducer=(state=initialState,action)=>{
    switch(action.type){
        case "ADD_SINGLE_PRODUCT":
            return{
                ...state,
                singleProduct:action.payload
            }
        case "SET_VIEW":
            return{
                ...state,
                gridView:action.payload
            }
        case "SORT_PRODUCTS":
            let filter_products;
            if(action.payload==="lowest"){
                filter_products=state.products.sort((a,b)=>a.price-b.price)
            }
            if(action.payload==="highest"){
                filter_products=state.products.sort((a,b)=>b.price-a.price)
            }
            if(action.payload==="a-z"){
                filter_products=state.products.sort((a,b)=>a.name.localeCompare(b.name))
            }
            if(action.payload==="z-a"){
                filter_products=state.products.sort((a,b)=>b.name.localeCompare(a.name))
            }
            return{
                ...state,
                filterProducts:[...filter_products]
            }
        default:
            return state
    }
}