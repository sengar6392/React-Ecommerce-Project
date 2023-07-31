import React from "react";
import GridView from "./GridView";
import ListView from "./ListView";
import { useSelector } from "react-redux";
const ProductList = () => {
    const gridView=useSelector(state=>state.productsReducer.gridView)
    const products=useSelector(state=>state.productsReducer.filterProducts)
  if (gridView === true) {
    return <GridView products={products} />;
  }

  if (gridView === false) {
    return <ListView products={products} />;
  }
};

export default ProductList;