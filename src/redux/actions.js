export const addSingleProduct=(data)=>{
    return {
        type:"ADD_SINGLE_PRODUCT",
        payload:data
    }
}
export const setView=(value)=>{
    return {
        type:"SET_VIEW",
        payload:value
    }
}
export const sortProducts=(category)=>{
    return{
        type:"SORT_PRODUCTS",
        payload:category
    }
}
export const searchProducts=(userInput)=>{
    return{
        type:"SEARCH_PRODUCTS",
        payload:userInput
    }
}
export const setFilters=(filterName,value)=>{
    return{
        type:"SET_FILTERS",
        payload:{
            filterName,
            value
        }
    }
}
export const filterProducts=()=>{
    return{
        type:"FILTER_PRODUCTS"
    }
}

