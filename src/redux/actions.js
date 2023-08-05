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
export const clearFilters=()=>{
    return{
        type:"CLEAR_FILTERS"
    }
}

// CART ACTIONS


export const addToCart=(product)=>{
    return{
        type:"ADD_TO_CART",
        payload:product
    }
}
export const increaseQuantity=(id)=>{
    return{
        type:"INCREASE_QUANTITY",
        payload:id
    }
}
export const decreaseQuantity=(id)=>{
    return{
        type:"DECREASE_QUANTITY",
        payload:id
    }
}


export const removeFromCart=(id)=>{
    return{
        type:"REMOVE_FROM_CART",
        payload:id
    }
}

export const clearCart=()=>{
    return{
        type:"CLEAR_CART"
    }
}
