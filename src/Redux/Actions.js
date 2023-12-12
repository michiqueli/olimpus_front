import axios from "axios";
import { setSearchedProducts, setProductTypes } from "./sliceProducts";

export const getDiscountProducts = async (dispatch) => {
  try {
    const response = await axios.get(
      `https://olimpusback.up.railway.app/products`
    );
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

export const getById = (id) => {
  return async function (dispatch) {
    let json = await axios.get(
      `https://olimpusback.up.railway.app/products/${id}`
    );
    return dispatch({
      type: GET_PRODUCTS_ID,
      payload: json.data,
    });
  };
};

export const createActivity = (payload) => {
  return async function (dispatch) {
    let json = await axios.post(
      `https://olimpusback.up.railway.app/products`,
      payload
    );
    return dispatch({
      type: CREATE_PRODUCT,
      payload: json.data,
    });
  };
};

export const modifyProduct = (id, payload) => {
  return async function (dispatch) {
    let json = await axios.get(
      `https://olimpusback.up.railway.app/products/update/${id}`,
      payload
    );
    return dispatch({
      type: MODOFY_PRODUCT,
      payload: json.data,
    });
  };
};
export const deleteProduct = (id) => {
  return async function (dispatch) {
    let json = await axios.get(
      `https://olimpusback.up.railway.app/products/delete/${id}`
    );
    return dispatch({
      type: DELETE_PRODUCT,
      payload: json.data,
    });
  };
};

export const filterProduct = (payload) => {
  return {
    type: FILTER_BY_PRODUCT,
    payload: payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload: payload,
  };
};
export const orderByPrice = (payload) => {
  return {
    type: ORDER_BY_PRICE,
    payload: payload,
  };
};

//////////////////////////////// Actions users ///////////////////////////////////////////////
export const CREATE_USER = "CREATE_USER";
export const GET_USERS = "GET_USERS";
export const EMAIL_USER = "EMAIL_USER";
export const ID_USER = "ID_USER";
export const DELETE_USER = "DELETE_USER";
export const MODOFY_USER = "MODIFY_USER";

export const createUser = (payload) => {
  return async function (dispatch) {
    let json = await axios.post(
      `https://olimpusback.up.railway.app/users/register`,
      payload
    );
    return dispatch({
      type: CREATE_USER,
      payload: json.data,
    });
  };
};

export const getUsers = () => {
  return async function (dispatch) {
    let json = await axios.get(`https://olimpusback.up.railway.app/users`);
    return dispatch({
      type: GET_USERS,
      payload: json.data,
    });
  };
};

export const getUsersByName = (name) => {
  return async function (dispatch) {
    let json = await axios.get(
      `https://olimpusback.up.railway.app/users/name/?name=${name}`
    );
    return dispatch({
      type: GET_USERS,
      payload: json.data,
    });
  };
};

export const getUsersById = (id) => {
  return async function (dispatch) {
    let json = await axios.get(
      `https://olimpusback.up.railway.app/users/${id}`
    );
    return dispatch({
      type: GET_USERS,
      payload: json.data,
    });
  };
};

export const modifyUser = (id) => {
  return async function (dispatch) {
    let json = await axios.get(
      `https://olimpusback.up.railway.app/users/update/${id}`
    );
    return dispatch({
      type: GET_USERS,
      payload: json.data,
    });
  };
};

export const deleteUser = (id) => {
  return async function (dispatch) {
    let json = await axios.get(
      `https://olimpusback.up.railway.app/users/delete/${id}`
    );
    return dispatch({
      type: GET_USERS,
      payload: json.data,
    });
  };
};
//////////////////////////////// Actions users ///////////////////////////////////////////////
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
