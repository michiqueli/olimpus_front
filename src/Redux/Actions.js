import axios from "axios"
import { setUsers, setCartUser } from "./sliceUsers";
import { setSearchedProducts, setProducts, setProductTypes, setFilteredProducts } from "./sliceProducts";
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
import getAllProducts from "@/components/requests/getAllProducts";

export const getTodosProducts= async (dispatch)=>{

    try{
        let json= await axios.get(`${baseURL}/products`)
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
      `${baseURL}/products/name?name=${name}`
    );
    dispatch(setSearchedProducts(response.data));
  } catch (error) {
    console.error("Error fetching product by name:", error);
  }
};


export const getById = async(id,dispatch)=>{
   try{
        let json= await axios.get(`${baseURL}/products/${id}`)
        dispatch(setProducts(json.data))
    }catch(error){
        console.error("'Error fetching product by id:', error")
    }
}

export const createProduct = async (payload, dispatch)=>{
  try{
    let json= await axios.post(`${baseURL}/products`, payload)
    dispatch(setProducts(json.data))
  }catch(error){
    console.error("Error al crear el producto",error)
  }
}

export const modifyProduct= async (id,payload, dispatch)=>{
  try{
    let json= await axios.get(`${baseURL}/products/update/${id}`, payload) 
    dispatch(setProducts(json.data))
  }catch(error){
    console.error("Error al modificar el producto")
  }
}

export const deleteProduct= async (id, dispatch)=>{
  try{
    let json= await axios.get(`${baseURL}/products/delete/${id}`) 
    dispatch(setProducts(json.data))
  }catch(error){
    console.error("Error al eliminar el producto", error)
  }
}

//////////////////////////////// Actions users ///////////////////////////////////////////////

export const createUser= async (payload, dispatch)=>{
  try{
    let json= await axios.post(`${baseURL}/users/register`, payload) 
    dispatch(setUsers(json.data))
  }catch(error){
    console.error("Error al crear el usuario", error)
  }
}

export const getUsers= async (dispatch)=>{

    try{
       let json= await axios.get(`${baseURL}/users`)
       dispatch(setUsers(json.data))
    }catch(error){
        console.error("Error al buscar los usuarios", error)
}
}

export const getUserRegister= async (dispatch)=>{
  try{
    let json= await axios.get(`${baseURL}/users/register`)
    dispatch(setUsers(json.data))
  }catch(error){
    console.error("Error al buscar los usuarios", error)
  }
}

export const getUsersByName= async (name, dispatch)=>{
  try{
    let json= await axios.get(`${baseURL}/users/name/?name=${name}`) 
    dispatch(setUsers(json.data))
  }catch(error){
    console.error("Error al encontrar el usuario", error)
  }
}

export const getUsersById= async (id, dispatch)=>{

    try{
       let json= await axios.get(`${baseURL}/users/${id}`) 
       dispatch(setUsers(json.data))
    }catch(error){
        console.error("Error al encontrar el usuario por id", error)
    }
}

export const modifyUser= async (id, dispatch)=>{
  try{
    let json= await axios.get(`${baseURL}/users/update/${id}`) 
    dispatch(setUsers(json.data))
  }catch(error){
    console.error("Error al modificar el usuario", error)
  }
}

export const deleteUser= async (id, dispatch)=>{
  try {
    let json= await axios.get(`${baseURL}/users/delete/${id}`) 
    dispatch(setUsers(json.data))
  }catch(error){
    console.error("Error al eliminar el usuario", error);
  }
}

//////////////////////////////// Types products ///////////////////////////////////////////////
export const getAllTypes = async () => {
  try {
    const response = await axios.get(
      "${baseURL}/types/all"
    );
    dispatch(setProductTypes(response.data));
  } catch (error) {
    console.error("Error fetching Types", error);
  }
};

export const getAllTypesInStock= async (dispatch, payload)=>{
  try{
    const json= await axios.get(`${baseURL}/types`,payload)
    dispatch(setProductTypes(json.data))
  }catch(error){
    console.error("Error al traer los productos en stock")
  }
}

export const getSubtypes= async (dispatch, payload)=>{
  try{
    const json= await axios.get(`${baseURL}/types/withSubtypes`,payload)
    dispatch(setProductTypes(json.data))
  }catch(error){
    console.error("Error al traer los productos en stock")
  }
}

///////////////////////////// FILTERS PRODUCT ///////////////////////
export const getTypes= async (Type, dispatch)=>{
  try{
    const json= await axios.get(`${baseURL}/products/filterByType/${Type}`)
    dispatch(setFilteredProducts(json.data))
  }catch(error){
    console.error("Error fetching types") 
  }
}

export const getSubTypes= async (subType,dispatch)=>{
  try{
    const json= await axios.get(`${baseURL}/products/filterBySubtype/${subType}`)
    dispatch(setFilteredProducts(json.data))
  }catch(error){
    console.error("Error fetching subtypes")
  }
}

export const getMetrics= async (subtype,metric,dispatch)=>{
  try{
    const json= await axios.get(`${baseURL}/products/filterByMetric/${metric}/${subtype}`)
    dispatch(setFilteredProducts(json.data))
  }catch(error){
    console.error("Error fetching metrics")
  }
}

export const orderByPrice= async (sortedProducts,dispatch)=>{
  try{
    const json= await axios.get(`${baseURL}/products/orderByPrice/${sortedProducts}`)
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
    const json= await axios.get(`${baseURL}/products`)
    dispatch(setFilteredProducts(json.data))
  }catch(error){
    console.error("Error fetching products ", error)
  }
}


//////////////////////////////// CARRITO /////////////////////////////////////////

export const getUserHistorial= async (userId,dispatch)=>{
  try {
     let json= await axios.get(`${baseURL}/purchases/getUserHistorial/${userId}`)
     dispatch(setCartUser(json.data))
  }catch(error){
      console.error("Error al encontrar historial del usuario", error);
  }
}

//////////////////////////////// Reviews //////////////////////////////
export const createReview= async (rev, dispatch)=>{
  console.log("resp", rev)
  try {
    let json= await axios.post(`${baseURL}/reviews/createReview`, rev)
    dispatch(setProducts(json.data))
  }catch(error){
    console.error("Error al eliminar el producto del carrito", error);
  }
}
