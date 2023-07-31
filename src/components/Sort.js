import React from "react";
import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { setView,sortProducts } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Sort = () => {
  const dispatch=useDispatch();
  const gridView=useSelector(state=>state.productsReducer.gridView)
  const filterProducts=useSelector(state=>state.productsReducer.filterProducts)
  const sorting=(evt)=>{
    // console.log(evt.target.value)
    dispatch(sortProducts(evt.target.value))
  }
  return (
    <Wrapper className="sort-section">
      {/* 1st column  */}
      <div className="sorting-list--grid">
        <button
          className={gridView ? "active sort-btn" : "sort-btn"}
          onClick={()=>dispatch(setView(true))}>
          <BsFillGridFill className="icon" />
        </button>

        <button
          className={!gridView ? "active sort-btn" : " sort-btn"}
          onClick={()=>dispatch(setView(false))}>
          <BsList className="icon" />
        </button>
      </div>
      {/* 2nd column  */}
      <div className="product-data">
        <p>{`${filterProducts.length} Product Available`}</p>
      </div>

      {/* 3rd column  */}
      <div className="sort-selection">
        <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="sort-selection--style"
            onClick={(event)=>sorting(event)}
          >
            <option value="lowest">Price(lowest)</option>
            <option value="#" disabled></option>
            <option value="highest">Price(highest)</option>
            <option value="#" disabled></option>
            <option value="a-z">Price(a-z)</option>
            <option value="#" disabled></option>
            <option value="z-a">Price(z-a)</option>
          </select>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;

  .sorting-list--grid {
    display: flex;
    gap: 2rem;

    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .icon {
      font-size: 1.6rem;
    }
    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }

  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;

    .sort-select--option {
      padding: 0.5rem 0;
      cursor: pointer;
      height: 2rem;
      padding: 10px;
    }
  }
`;

export default Sort;