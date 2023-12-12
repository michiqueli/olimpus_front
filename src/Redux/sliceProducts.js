import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  searchedProducts: [],
  productTypes:[],
};
export const productsHandler = createSlice({
  name: "productsState",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSearchedProducts: (state, action) => {
      state.searchedProducts = action.payload;
    },
    setProductTypes: (state, action) => {
      state.productTypes = action.payload;
    },
  },
});

export const getProducts = (state) => state.products.products;
export const getSearchedProducts = (state) => state.products.searchedProducts;
export const getProductTypes = (state) => state.products.productTypes;

export const { setProducts, setSearchedProducts, setProductTypes } = productsHandler.actions;

export default productsHandler.reducer;
