import React from "react";
import GridView from "./GridView";
import ListView from "./ListView";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect } from "react";
import { fetchProducts } from "../redux/slice/productsSlice";

const ProductList = () => {
  // const dispatch = useDispatch()
  // useEffect(()=>{
  //   console.log('hiiiiiii');
  //   dispatch(fetchProducts())
  // },[])
    const gridView=useSelector(state=>state.productsReducer.gridView)
    const products=useSelector(state=>state.productsReducer.filterProducts)
  if(products.length===0){
    return (
      <EmptyDiv>
        <h3>No Product Availaible </h3>
      </EmptyDiv>
    );
  }
  if (gridView === true) {
    return <GridView products={products} />;
  }

  if (gridView === false) {
    return <ListView products={products} />;
  }
};
const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;

  h3 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: 300;
  }
`;

export default ProductList;