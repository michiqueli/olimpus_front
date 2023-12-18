import {createSlice} from "@reduxjs/toolkit";

const initialState={
    productTypes:[]
};

export const productTypeHandler=createSlice({
    name:"productTypes",
    initialState,
    reducers:{
        setProductTypes: (state,action) => {
            state.productTypes = action.payload
        }
    }
});

export const getProductTypes= (state) => 
    state.productTypes.productTypes;


export const{
    setProductTypes,
}=productTypeHandler.actions

export default productTypeHandler.reducer;