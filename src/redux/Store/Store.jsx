import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/AuthSlice/authSlice";
import productSlice from "../features/ProductSlice/productSlice";
import filterSlice from "../features/FilterSlice/filterSlice";
import cartSlice from "../features/CartSlice/cartSlice";


const store = configureStore({
    reducer: {
        activeUser: authSlice,
        products: productSlice,
        filter:filterSlice,
        cart:cartSlice,
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: false,
        }),


})

export default store;