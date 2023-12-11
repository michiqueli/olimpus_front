import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    users: [],
  
}
export const productsHandler = createSlice({
name: "usersState",
initialState,
reducers: {
    setUsers:(state, action) => {
        state.users = action.payload;
    },
}
});

export const getUsers = (state) => 
    state.users.users;


export const {
    setUsers,
} = productsHandler.actions;

export default usersHandler.reducer;