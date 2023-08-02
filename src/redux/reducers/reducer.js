import { products } from "../../data";
import { filterProducts } from "../actions";
const featureProducts = products.filter((ele) => ele.featured === true);
const getUniqueData = (data, property) => {
  let uniqueData;
  uniqueData = data.map((ele) => {
    return ele[property];
  });
  if (property === "colors") {
    uniqueData = uniqueData.flat();
  }
  if (property === "price") return uniqueData;
  uniqueData = ["All", ...new Set(uniqueData)];
  return uniqueData;
};

const categoryData = getUniqueData(products, "category");
const companyData = getUniqueData(products, "company");
const colorsData = getUniqueData(products, "colors");
const priceData = getUniqueData(products, "price");
const maxPrice = Math.max(...priceData);
const minPrice = Math.min(...priceData);

const initialState = {
  products: products,
  featureProducts: featureProducts,
  singleProduct: {},
  gridView: true,
  filterProducts: products,
  categoryData,
  companyData,
  colorsData,
  maxPrice,
  minPrice,
  filters: {
    category: "All",
    company: "All",
    colors: "All",
    price: maxPrice,
  },
};
export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SINGLE_PRODUCT":
      return {
        ...state,
        singleProduct: action.payload,
      };
    case "SET_VIEW":
      return {
        ...state,
        gridView: action.payload,
      };
    case "SORT_PRODUCTS":
      let filter_products;
      if (action.payload === "lowest") {
        filter_products = state.filterProducts.sort(
          (a, b) => a.price - b.price
        );
      }
      if (action.payload === "highest") {
        filter_products = state.filterProducts.sort(
          (a, b) => b.price - a.price
        );
      }
      if (action.payload === "a-z") {
        filter_products = state.filterProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (action.payload === "z-a") {
        filter_products = state.filterProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      return {
        ...state,
        filterProducts: [...filter_products],
      };
    case "SEARCH_PRODUCTS":
      const userInput = action.payload;
      const searchList = state.products.filter((prod) =>
        prod.name.toLowerCase().includes(userInput)
      );
      // console.log(filteredList)
      return {
        ...state,
        filterProducts: [...searchList],
      };
    case "SET_FILTERS":
      const { filterName, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [filterName]: value,
        },
      };

    case "FILTER_PRODUCTS":
      const { category, company, colors, price } = state.filters;
      let filteredList = [...state.products];
      if (category !== "All") {
        filteredList = filteredList.filter(
          (prod) => prod.category === category
        );
      }
      if (company !== "All") {
        filteredList = filteredList.filter((prod) => prod.company === company);
      }
      if (colors !== "All") {
        filteredList = filteredList.filter((prod) =>
          prod.colors.includes(colors)
        );
      }
      filteredList = filteredList.filter((prod) => prod.price <= price);
      return {
        ...state,
        filterProducts: filteredList,
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          category: "All",
          company: "All",
          colors: "All",
          price: maxPrice,
        },
      };
    default:
      return state;
  }
};
