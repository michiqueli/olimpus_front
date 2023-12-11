import { configureStore } from "@reduxjs/toolkit";
import productsHandler from "./sliceProducts";

export const store = configureStore({
  reducer: {
    products: productsHandler,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
