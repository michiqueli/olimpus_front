import axios from "axios"
import { setUsers, setCartUser } from "./sliceUsers";
import { setSearchedProducts, setProducts, setProductTypes, setFilteredProducts } from "./sliceProducts";

import getAllProducts from "@/components/requests/getAllProducts";
import getAllUsers from "@/components/requests/getAllUsers";

export const getTodosProducts= async (dispatch)=>{

    try{
        let json= await axios.get(`https://olimpusback.up.railway.app/products`)
        dispatch(setProducts(json.data));
        dispatch(setFilteredProducts(json.data))
    }catch(error){
        console.error("Error fetching products ", error)
    }

}

export const getDiscountProducts = async (dispatch) => {
  try {
    const response = await getAllProducts();
    const filtered = response.data.filter((product) => product.discount > 0);
    dispatch(setProducts(filtered));
  } catch (error) {
    console.error("Error fetching product whit Discounts:", error);
  }
};

export const getProductByName = async (name, dispatch) => {
  try {
    const response = await axios.get(
      `https://olimpusback.up.railway.app/products/name?name=${name}`
    );
    dispatch(setSearchedProducts(response.data));
  } catch (error) {
    console.error("Error fetching product by name:", error);
  }
};


export const getById = async(id,dispatch)=>{
   try{
        let json= await axios.get(`https://olimpusback.up.railway.app/products/${id}`)
        dispatch(setProducts(json.data))
    }catch(error){
        console.error("'Error fetching product by id:', error")
    }
}

export const createProduct = async (payload, dispatch)=>{
  try{
    let json= await axios.post(`https://olimpusback.up.railway.app/products`, payload)
    dispatch(setProducts(json.data))
  }catch(error){
    console.error("Error al crear el producto",error)
  }
}

export const modifyProduct= async (id,payload, dispatch)=>{
  try{
    let json= await axios.get(`https://olimpusback.up.railway.app/products/update/${id}`, payload) 
    dispatch(setProducts(json.data))
  }catch(error){
    console.error("Error al modificar el producto")
  }
}

export const deleteProduct= async (id, dispatch)=>{
  try{
    let json= await axios.get(`https://olimpusback.up.railway.app/products/delete/${id}`) 
    dispatch(setProducts(json.data))
  }catch(error){
    console.error("Error al eliminar el producto", error)
  }
}

//////////////////////////////// Actions users ///////////////////////////////////////////////

export const createUser= async (payload, dispatch)=>{
  try{
    let json= await axios.post(`https://olimpusback.up.railway.app/users/register`, payload) 
    dispatch(setUsers(json.data))
  }catch(error){
    console.error("Error al crear el usuario", error)
  }
}

export const getUsers= async (dispatch)=>{

    try{
       let json= await axios.get(`https://olimpusback.up.railway.app/users`)
       dispatch(setUsers(json.data))
    }catch(error){
        console.error("Error al buscar los usuarios", error)
}
}

export const getUserRegister= async (dispatch)=>{
  try{
    let json= await axios.get(`https://olimpusback.up.railway.app/users/register`)
    dispatch(setUsers(json.data))
  }catch(error){
    console.error("Error al buscar los usuarios", error)
  }
}

export const getUsersByName= async (name, dispatch)=>{
  try{
    let json= await axios.get(`https://olimpusback.up.railway.app/users/name/?name=${name}`) 
    dispatch(setUsers(json.data))
  }catch(error){
    console.error("Error al encontrar el usuario", error)
  }
}

export const getUsersById= async (id, dispatch)=>{

    try{
       let json= await axios.get(`https://olimpusback.up.railway.app/users/${id}`) 
       dispatch(setUsers(json.data))
    }catch(error){
        console.error("Error al encontrar el usuario por id", error)
    }
}

export const modifyUser= async (id, dispatch)=>{
  try{
    let json= await axios.get(`https://olimpusback.up.railway.app/users/update/${id}`) 
    dispatch(setUsers(json.data))
  }catch(error){
    console.error("Error al modificar el usuario", error)
  }
}

export const deleteUser= async (id, dispatch)=>{
  try {
    let json= await axios.get(`https://olimpusback.up.railway.app/users/delete/${id}`) 
    dispatch(setUsers(json.data))
  }catch(error){
    console.error("Error al eliminar el usuario", error);
  }
}

//////////////////////////////// Types products ///////////////////////////////////////////////
export const getAllTypes = async () => {
  try {
    const response = await axios.get(
      "https://olimpusback.up.railway.app/types/all"
    );
    dispatch(setProductTypes(response.data));
  } catch (error) {
    console.error("Error fetching Types", error);
  }
};

export const getAllTypesInStock= async (dispatch, payload)=>{
  try{
    const json= await axios.get(`https://olimpusback.up.railway.app/types`,payload)
    dispatch(setProductTypes(json.data))
  }catch(error){
    console.error("Error al traer los productos en stock")
  }
}

export const getSubtypes= async (dispatch, payload)=>{
  try{
    const json= await axios.get(`https://olimpusback.up.railway.app/types/withSubtypes`,payload)
    dispatch(setProductTypes(json.data))
  }catch(error){
    console.error("Error al traer los productos en stock")
  }
}

///////////////////////////// FILTERS PRODUCT ///////////////////////
export const getTypes= async (Type, dispatch)=>{
  try{
    const json= await axios.get(`https://olimpusback.up.railway.app/products/filterByType/${Type}`)
    dispatch(setFilteredProducts(json.data))
  }catch(error){
    console.error("Error fetching types") 
  }
}

export const getSubTypes= async (subType,dispatch)=>{
  try{
    const json= await axios.get(`https://olimpusback.up.railway.app/products/filterBySubtype/${subType}`)
    dispatch(setFilteredProducts(json.data))
  }catch(error){
    console.error("Error fetching subtypes")
  }
}

export const getMetrics= async (metric,dispatch)=>{
  try{
    const json= await axios.get(`https://olimpusback.up.railway.app/products/filterByMetric/${metric}`)
    dispatch(setFilteredProducts(json.data))
  }catch(error){
    console.error("Error fetching metrics")
  }
}

export const orderByPrice= async (sortedProducts,dispatch)=>{
  try{
    const json= await axios.get(`https://olimpusback.up.railway.app/products/orderByPrice/${sortedProducts}`)
    dispatch(setFilteredProducts(json.data))
  }catch(error){
    console.error("Error fetching metrics")
  }
}

export const orderByPrices= async (ordenar, dispatch)=>{
  dispatch(setFilteredProducts(ordenar))
}

export const reset= async (dispatch)=>{
  try{
    const json= await axios.get(`https://olimpusback.up.railway.app/products`)
    dispatch(setFilteredProducts(json.data))
  }catch(error){
    console.error("Error fetching products ", error)
  }
}


//////////////////////////////// CARRITO /////////////////////////////////////////

export const getUserHistorial= async (userId,dispatch)=>{
  try {
     let json= await axios.get(`https://olimpusback.up.railway.app/purchases/getUserHistorial/${userId}`)
     dispatch(setCartUser(json.data))
  }catch(error){
      console.error("Error al encontrar historial del usuario", error);
  }
}

//////////////////////////////// Reviews //////////////////////////////
export const createReview= async (rev, dispatch)=>{
  console.log("resp", rev)
  try {
    let json= await axios.post(`https://olimpusback.up.railway.app/reviews/createReview`, rev)
    dispatch(setProducts(json.data))
  }catch(error){
    console.error("Error al eliminar el producto del carrito", error);
  }
}
