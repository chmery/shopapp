import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cartReducer from "./cartSlice/cartSlice";
import favouritesReducer from "./favouritesSlice/favouritesSlice";

const store = configureStore({
    reducer: { cart: cartReducer, favourites: favouritesReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
