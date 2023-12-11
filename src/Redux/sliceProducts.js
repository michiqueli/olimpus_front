import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    products: [],
    searchedProducts: [],
}
export const productsHandler = createSlice({
name: "productsState",
initialState,
reducers: {
    setProducts:(state, action) => {
        state.drivers = action.payload;
    },
    setSearchedProducts: (state, action) => {
        state.searchedProducts = action.payload;
    },
}
});

export const getProducts = (state) => 
    state.products.products;
export const getSearchedProducts = (state) => 
    state.products.searchedProducts;

export const {
    setProducts,
    setSearchedProducts,
} = productsHandler.actions;

export default productsHandler.reducer;

