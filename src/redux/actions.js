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