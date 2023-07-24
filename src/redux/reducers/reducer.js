import { products } from "../../data"
const featureProducts=products.filter((ele)=>ele.featured===true)
const initialState={
    products:products,
    featureProducts:featureProducts,
    singleProduct:{},
    gridView:true
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
        default:
            return state
    }
}