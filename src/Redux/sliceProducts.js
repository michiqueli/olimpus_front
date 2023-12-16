import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [], // Todos los Productos
  searchedProducts: [], // Para renderizar en la Result Page
  withDiscountProduct: [], // Productos con descuento
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
    setWithDiscountProducts: (state, action) => {
      state.withDiscountProduct = action.payload;
    },
  },
});

export const getProducts = (state) => state.products.products;
export const getSearchedProducts = (state) => state.products.searchedProducts;
export const getWithDiscountProducts = (state) =>
  state.products.withDiscountProduct;

export const { setProducts, setSearchedProducts, setWithDiscountProducts } =
  productsHandler.actions;

export default productsHandler.reducer;

export const getAllProducts = async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`
    );
    console.log(response);
    dispatch(setProducts(response.data));
  } catch (error) {
    console.error("Error fetching products ", error);
  }
};

export const getProductsWithDiscount = async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/withDiscount`
    );
    console.log(response.data);
    dispatch(setWithDiscountProducts(response.data));
  } catch (error) {
    console.error("Error fetching products", error);
  }
};

export const getProductByName = async (name, dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/name?name=${name}`
    );
    console.log(response.data)
    dispatch(setSearchedProducts(response.data));
  } catch (error) {
    console.error("Error fetching product by name:", error);
  }
};

export const getProductById = async(id)=>{
  try{
       const response= await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`)
       console.log(response.data)
       return response.data
   }catch(error){
       console.error('Error fetching product by id:', error)
   }
}

export const createProduct = async (data)=>{
  try{
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/create`, data)
      console.log(`El producto ${response.data.name} ha sido Creado con exito`)
  }catch(error){
      console.error("Error al crear el producto", error)
  }
}

export const modifyProduct= async (id, data)=>{
  try{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/update/${id}`, payload)
    console.log(`El producto ${response.data.name} ha sido Modificado con exito`)
  }catch(error){
    console.error("Error al modificar el producto")
  }
}
export const deleteProduct= async (id, dispatch)=>{
  try{
     let json= await axios.get(`https://olimpusback.up.railway.app/products/delete/${id}`) 
     dispatch(setSearchedProducts(json.data))
  }catch(error){
      console.error("Error al eliminar el producto", error)
  }
}
