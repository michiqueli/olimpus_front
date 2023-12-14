
import axios from "axios"
import { setUsers } from "./sliceUsers";
import { setSearchedProducts, setProductTypes } from "./sliceProducts";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE"

import getAllProducts from "@/app/requests/getAllProducts";

export const getProducts= async (dispatch)=>{
    try{
        let json= await axios.get(`https://olimpusback.up.railway.app/products`)
        dispatch(setSearchedProducts(json.data));
    }catch(error){
        console.error("Error fetching products ", error)
    }
}

export const getDiscountProducts = async (dispatch) => {
  try {
    const response = await getAllProducts();
    const filtered = response.data.filter((product) => product.discount > 0);
    dispatch(setSearchedProducts(filtered));
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

export const getById = async(id)=>{
   try{
        let json= await axios.get(`https://olimpusback.up.railway.app/products/${id}`)
        console.log("json",json.data)
        return json.data
    }catch(error){
        console.error("'Error fetching product by id:', error")
    }
}

export const createProduct = async (payload, dispatch)=>{
    try{
        let json= await axios.post(`https://olimpusback.up.railway.app/products`, payload)
        dispatch(setSearchedProducts(json.data))
    }catch(error){
        console.error("Error al crear el producto",error)
    }
}

export const modifyProduct= async (id,payload, dispatch)=>{
    try{
       let json= await axios.get(`https://olimpusback.up.railway.app/products/update/${id}`, payload) 
       dispatch(setSearchedProducts(json.data))
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
export const getAllTypes = async (dispatch) => {
  try {
    const response = await axios.get(
      `https://olimpusback.up.railway.app/types/all`
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

