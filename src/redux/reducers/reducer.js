import { products } from "../../data"
import { filterProducts } from "../actions"
const featureProducts=products.filter((ele)=>ele.featured===true)
const initialState={
    products:products,
    featureProducts:featureProducts,
    singleProduct:{},
    gridView:true,
    filterProducts:products,
    filters:{
        category:"All",
        company:"All",
        colors:"All"
    }
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
                filter_products=state.filterProducts.sort((a,b)=>a.price-b.price)
            }
            if(action.payload==="highest"){
                filter_products=state.filterProducts.sort((a,b)=>b.price-a.price)
            }
            if(action.payload==="a-z"){
                filter_products=state.filterProducts.sort((a,b)=>a.name.localeCompare(b.name))
            }
            if(action.payload==="z-a"){
                filter_products=state.filterProducts.sort((a,b)=>b.name.localeCompare(a.name))
            }
            return{
                ...state,
                filterProducts:[...filter_products]
            }
        case "SEARCH_PRODUCTS":
            const userInput=action.payload
            const searchList=state.products.filter((prod)=>prod.name.toLowerCase().includes(userInput))
            // console.log(filteredList)
            return{
                ...state,
                filterProducts:[...searchList]
            }
        case "SET_FILTERS":
            const {filterName,value}=action.payload
            return{
                ...state,
                filters:{
                    ...state.filters,
                    [filterName]:value
                }
            }


        case "FILTER_PRODUCTS":
            const {category,company,colors}=state.filters
            let filteredList=[...state.products];
            if(category!=="All"){
                filteredList=filteredList.filter(prod=>prod.category===category)
            }
            if(company!=="All"){
                filteredList=filteredList.filter(prod=>prod.company===company)
            }
            if(colors!=="All"){
                filteredList=filteredList.filter(prod=>prod.colors.includes(colors))
            }
            return{
                ...state,
                filterProducts:filteredList
            }
        default:
            return state
    }
}