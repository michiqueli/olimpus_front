import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [], // Todos los Productos
  searchedProducts: [], // Para renderizar en la Result Page
  withDiscountProducts: [], // Productos con descuento
  productTypes:[],
  filteredProducts:[],
  filteredSubTypes:[]
};

export const productsHandler = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSearchedProducts: (state, action) => {
      state.searchedProducts = action.payload;
    },
    setWithDiscountProducts: (state, action) => {
      state.withDiscountProducts = action.payload;
    },
    setProductTypes: (state, action) => {
      state.productTypes = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    setFilteredSubtypes: (state, action) => {
      state.filteredSubTypes = action.payload;
    },
  },
});

export const getProducts = (state) => state.products.products;
export const getSearchedProducts = (state) =>
  state.products.searchedProducts;
export const getWithDiscountProducts = (state) =>
  state.products.withDiscountProducts;
export const getProductTypes = (state) =>
  state.products.productTypes;
export const getFilteredProducts = (state) =>
  state.products.filteredProducts;
export const getFilteredSubtypes = (state) =>
  state.products.filteredSubTypes;

export const {setProducts, setSearchedProducts, setWithDiscountProducts, setProductTypes, setFilteredProducts, setFilteredSubtypes} =
  productsHandler.actions;

export default productsHandler.reducer;

export const getAllProducts = async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`
    );
    dispatch(setProducts(response.data));
    dispatch(setSearchedProducts(response.data));
  } catch (error) {
    console.error("Error fetching products ", error);
  }
};

export const getProductsWithDiscount = async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/withDiscount`
    );
    dispatch(setWithDiscountProducts(response.data));
    dispatch(setSearchedProducts(response.data))
  } catch (error) {
    console.error("Error fetching products", error);
  }
};

export const getProductByName = async (name, dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/name?name=${name}`
    );
    dispatch(setSearchedProducts(response.data));
  } catch (error) {
    console.error("Error fetching product by name:", error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product by id:", error);
  }
};

export const createProduct = async (data) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/create`,
      data
    );
    window.alert(`El producto ${response.data.name} ha sido Creado con exito`);
  } catch (error) {
    console.error("Error al crear el producto", error);
  }
};

export const modifyProduct = async (id, data) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/update/${id}`,
      payload
    );
    window.alert(`El producto ${response.data.name} ha sido Modificado con exito`);
  } catch (error) {
    console.error("Error al modificar el producto");
  }
};
export const deleteProduct = async (id, dispatch) => {
  try {
    let json = await axios.delete(
      `https://olimpusback.up.railway.app/products/delete/${id}`
    );
    dispatch(setSearchedProducts(json.data));
  } catch (error) {
    console.error("Error al eliminar el producto", error);
  }
};

