
import axios from "axios"
import { setUsers } from "./sliceUsers";
import { setSearchedProducts, setProductTypes } from "./sliceProducts";

import getAllProducts from "@/app/requests/getAllProducts";




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

