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

export const getProducts=()=>{
    return async function (dispatch){
        let json= await axios.get(`https://olimpusback.up.railway.app/products`)
        return dispatch({
            type: GET_PRODUCTS,
            payload: json.data
        })
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

export const getById =(id)=>{
    return async function (dispatch){
        let json= await axios.get(`https://olimpusback.up.railway.app/products/${id}`)
        return dispatch({
            type: GET_PRODUCTS_ID,
            payload: json.data
        })
    }
}

export const createActivity =(payload)=>{
    return async function (dispatch){
        let json= await axios.post(`https://olimpusback.up.railway.app/products`,payload)
        return dispatch({
            type: CREATE_PRODUCT,
            payload: json.data
        })
    }
}

export const modifyProduct=(id,payload)=>{
    return async function (dispatch) {
       let json= await axios.get(`https://olimpusback.up.railway.app/products/update/${id}`,payload) 
       return dispatch({
        type: MODOFY_PRODUCT,
        payload: json.data
       })
    }
}
export const deleteProduct=(id)=>{
    return async function (dispatch) {
       let json= await axios.get(`https://olimpusback.up.railway.app/products/delete/${id}`) 
       return dispatch({
        type: DELETE_PRODUCT,
        payload: json.data
       })
    }
}

export const filterProduct=(payload)=>{
    return{
        type:FILTER_BY_PRODUCT,
        payload: payload
    }
}

export const orderByName=(payload)=>{
    return{
        type:ORDER_BY_NAME,
        payload: payload
    }
}
export const orderByPrice=(payload)=>{
    return{
        type:ORDER_BY_PRICE,
        payload: payload
    }
}


//////////////////////////////// Actions users ///////////////////////////////////////////////
export const CREATE_USER= "CREATE_USER"
export const GET_USERS= "GET_USERS"
export const EMAIL_USER= "EMAIL_USER"
export const ID_USER= "ID_USER"
export const DELETE_USER= "DELETE_USER"
export const MODOFY_USER= "MODIFY_USER"

export const createUser=(payload)=>{
    return async function (dispatch) {
       let json= await axios.post(`https://olimpusback.up.railway.app/users/register`,payload) 
       return dispatch({
        type: CREATE_USER,
        payload: json.data
       })
    }
}

export const getUsers=()=>{
    return async function (dispatch) {
       let json= await axios.get(`https://olimpusback.up.railway.app/users`) 
       return dispatch({
        type: GET_USERS,
        payload: json.data
       })
    }
}

export const getUsersByName=(name)=>{
    return async function (dispatch) {
       let json= await axios.get(`https://olimpusback.up.railway.app/users/name/?name=${name}`) 
       return dispatch({
        type: GET_USERS,
        payload: json.data
       })
    }
}

export const getUsersById=(id)=>{
    return async function (dispatch) {
       let json= await axios.get(`https://olimpusback.up.railway.app/users/${id}`) 
       return dispatch({
        type: GET_USERS,
        payload: json.data
       })
    }
}

export const modifyUser=(id)=>{
    return async function (dispatch) {
       let json= await axios.get(`https://olimpusback.up.railway.app/users/update/${id}`) 
       return dispatch({
        type: GET_USERS,
        payload: json.data
       })
    }
}

export const deleteUser=(id)=>{
    return async function (dispatch) {
       let json= await axios.get(`https://olimpusback.up.railway.app/users/delete/${id}`) 
       return dispatch({
        type: GET_USERS,
        payload: json.data
       })
    }
}
