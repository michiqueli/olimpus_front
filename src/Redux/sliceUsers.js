import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    users: [],
    cartUser:[]
}
export const usersHandler = createSlice({
name: "usersState",
initialState,
reducers: {
    setUsers:(state, action) => {
        state.users = action.payload;
    },
    setCartUser:(state, action) => {
        state.cartUser = action.payload;
    },
}
});

export const getUsers = (state) => 
    state.users.users;

export const getCartUser = (state)=>{
    state.users.cartUser
}

export const {
    setUsers,
    setCartUser
} = usersHandler.actions;

export default usersHandler.reducer;