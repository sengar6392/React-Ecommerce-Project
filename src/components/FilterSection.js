import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { searchProducts, filterProducts } from "../redux/actions";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { setFilters,clearFilters } from "../redux/actions";
import { useEffect } from "react";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";
const FilterSection = () => {
  const dispatach = useDispatch();
  const {categoryData,companyData,colorsData,maxPrice,minPrice} = useSelector((state) => state.productsReducer);
  const { category, company, colors, price } = useSelector(
    (state) => state.productsReducer.filters
  );
  const searchBoxHandler = (event) => {
    // console.log(event.target.value)
    dispatach(searchProducts(event.target.value));
  };

  const updateFilterValue = (event) => {
    let filterName = event.target.name;
    let value = event.target.value;
    // console.log(filterName,value);
    dispatach(setFilters(filterName, value));
  };

  useEffect(() => {
    console.log(category, company, colors,price);
    dispatach(filterProducts());
  }, [category, company, colors,price]);

  return (
    <Wrapper>
      <div className="filter-search">
        <form>
          <input
            type="text"
            name="text"
            placeholder="Search"
            onChange={searchBoxHandler}
          />
        </form>
      </div>
      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryData.map((curElem, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={curElem}
                onClick={updateFilterValue}
                className={curElem === category ? "active" : ""}
              >
                {curElem}
              </button>
            );
          })}
        </div>
      </div>
      <div className="filter-company">
        <h3>Company</h3>

        <form action="#">
          <select
            name="company"
            id="company"
            className="filter-company--select"
            onClick={updateFilterValue}
          >
            {companyData.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name="company">
                  {curElem}
                </option>
              );
            })}
          </select>
        </form>
      </div>

      <div className="filter-colors colors">
        <h3>Colors</h3>

        <div className="filter-color-style">
          {colorsData.map((curColor, index) => {
            if (curColor === "All") {
              return (
                <button
                  key={index}
                  type="button"
                  value={curColor}
                  name="color"
                  // style={{ backgroundColor: curColor}}
                  className="color-all--style"
                  onClick={updateFilterValue}
                >
                  {curColor}
                </button>
              );
            }
            return (
              <button
                key={index}
                type="button"
                value={curColor}
                name="colors"
                style={{ backgroundColor: curColor }}
                className={curColor === colors ? "btnStyle active" : "btnStyle"}
                onClick={updateFilterValue}
              >
                {curColor === colors ? (
                  <FaCheck className="checkStyle" />
                ) : null}
              </button>
            );
          })}
        </div>
        <div className="filter_price">
          <h3>Price</h3>
          <p>
            <FormatPrice price={price} />
          </p>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={price}
            name="price"
            onChange={updateFilterValue}
          />
        </div>
      </div>
      <div className="filter-clear">
        <Button className="btn" onClick={()=>dispatach(clearFilters())}>
          Clear Filters
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }
  .checkStyle {
    color: #fff;
    font-size: x-large;
    padding-left: 0;
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;
