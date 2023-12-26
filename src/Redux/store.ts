import { configureStore } from "@reduxjs/toolkit";
import productsHandler from "./sliceProducts";
import usersHandler from "./sliceUsers";
import productTypeHandler from "./sliceTypes"

export const store = configureStore({
  reducer: {
    products: productsHandler,
    users: usersHandler,
    productTypes: productTypeHandler
    
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
