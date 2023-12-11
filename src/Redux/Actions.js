import axios from "axios"
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_NAME= "GET_PRODUCTS_NAME"
export const GET_PRODUCTS_ID= "GET_PRODUCTS_ID"
export const CREATE_PRODUCT= "CREATE_PRODUCT"
export const MODOFY_PRODUCT= "MODIFY_PRODUCT"
export const DELETE_PRODUCT= "DELET_PRODUCT"
export const FILTER_BY_PRODUCT= "FILTER_PRODUCT"
export const ORDER_BY_NAME= "ORDER_BY_NAME"
export const ORDER_BY_PRICE= "ORDER_BY_PRICE"
import { setSearchedProducts } from "./sliceProducts";
import { setUsers } from "./sliceUsers";

export const getProducts= async (dispatch)=>{
    try{
        let json= await axios.get(`https://olimpusback.up.railway.app/products`)
        dispatch(setSearchedProducts(json.data));
    }catch(error){
        console.error("Error fetching products ", error)
    }
}

export const getProductByName = async (name, dispatch) => {
    try {
        const response = await axios.get(`https://olimpusback.up.railway.app/products/name?name=${name}`);
        dispatch(setSearchedProducts(response.data));
    } catch (error) {
        console.error('Error fetching product by name:', error);
    }
};

export const getById = async(id,dispatch)=>{
   try{
        let json= await axios.get(`https://olimpusback.up.railway.app/products/${id}`)
        dispatch(setSearchedProducts(json.data))
    }catch(error){
        console.error("'Error fetching product by id:', error")
    }
}

export const createActivity = async (payload, dispatch)=>{
    try{
        let json= await axios.post(`https://olimpusback.up.railway.app/products,payload`)
        dispatch(setSearchedProducts(json.data))
    }catch(error){
        console.error("Error al crear el producto",error)
    }
}

export const modifyProduct= async (id,payload, dispatch)=>{
    try{
       let json= await axios.get(`https://olimpusback.up.railway.app/products/update/${id},payload`) 
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

// export const filterProduct=(payload)=>{
//     return{
//         type:FILTER_BY_PRODUCT,
//         payload: payload
//     }
// }

// export const orderByName=(payload)=>{
//     return{
//         type:ORDER_BY_NAME,
//         payload: payload
//     }
// }
// export const orderByPrice=(payload)=>{
//     return{
//         type:ORDER_BY_PRICE,
//         payload: payload
//     }
// }


//////////////////////////////// Actions users ///////////////////////////////////////////////
export const CREATE_USER= "CREATE_USER"
export const GET_USERS= "GET_USERS"
export const EMAIL_USER= "EMAIL_USER"
export const ID_USER= "ID_USER"
export const DELETE_USER= "DELETE_USER"
export const MODOFY_USER= "MODIFY_USER"

export const createUser= async (payload, dispatch)=>{
    try{
       let json= await axios.post(`https://olimpusback.up.railway.app/users/register,payload`) 
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