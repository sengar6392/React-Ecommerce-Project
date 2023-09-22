import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data;
});

const initialState = {
  isLoading: "false",
  products: [],
  isError: "false",
  featureProducts: null,
  singleProduct: {},
  gridView: true,
  filterProducts: null,
  categoryData: null,
  brandData: null,
  maxPrice: null,
  minPrice: null,
  filters: {
    category: "All",
    company: "All",
    price: null,
  },
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addSingleProduct: (state, action) => {
      state.products.forEach(item=>{
        if(item.id===action.payload){
          state.singleProduct=item
        }
      });
    },
    setView: (state, action) => {
      state.gridView = action.payload;
    },
    sortProducts: (state, action) => {
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
          a.title.localeCompare(b.title)
        );
      }
      if (action.payload === "z-a") {
        filter_products = state.filterProducts.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      }

      state.filterProducts = filter_products;
    },
    searchProducts: (state, action) => {
      const userInput = action.payload;
      const searchList = state.products.filter((prod) =>
        prod.title.toLowerCase().includes(userInput)
      );

      state.filterProducts = searchList;
    },
    setFilters: (state, action) => {
      const { filterName, value } = action.payload;
      state.filters[filterName] = value;
      console.log('filters aciont',state.filters);
    },
    filterProducts: (state, action) => {
      const { category, company, price } = state.filters;
      console.log('comapny',company);
      let filteredList = [...state.products];
      if (category !== "All") {
        filteredList = filteredList.filter(
          (prod) => prod.category === category
        );
      }
      if (company !== "All") {
        filteredList = filteredList.filter((prod) => prod.brand === company);
      }
  
      filteredList = filteredList.filter((prod) => prod.price <= price);
      
      state.filterProducts=filteredList;
      console.log('list filtered');
    },
    clearFilters: (state, action) => {
        state.filters={
            category: "All",
            company: "All",
            colors: "All",
            price: state.maxPrice,
          }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = "true";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const {products}=action.payload
      state.products = products;
      state.filterProducts = products;
      state.featureProducts=[products[0],products[1],products[2]]
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
      const categoryData = getUniqueData(state.products, "category");
      const brandData = getUniqueData(state.products, "brand");
      const priceData = getUniqueData(state.products, "price");
      const maxPrice = Math.max(...priceData);
      const minPrice = Math.min(...priceData);

      state.categoryData = categoryData;
      state.brandData = brandData;
      state.priceData = priceData;
      state.maxPrice = maxPrice;
      state.minPrice = minPrice;
      state.filters.price = maxPrice;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isError = "true";
    });
  },
});

export const {
  addSingleProduct,
  setView,
  sortProducts,
  searchProducts,
  setFilters,
  filterProducts,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
