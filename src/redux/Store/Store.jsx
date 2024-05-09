import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/AuthSlice/authSlice";
import productSlice from "../features/ProductSlice/productSlice";
import filterSlice from "../features/FilterSlice/filterSlice";
import cartSlice from "../features/CartSlice/cartSlice";
import checkoutSlice from "../features/CheckoutSlice/checkoutSlice";
import orderReducer from "../features/OrderSlice/orderSlice";


const store = configureStore({
    reducer: {
        activeUser: authSlice,
        products: productSlice,
        filter:filterSlice,
        cart:cartSlice,
        checkout:checkoutSlice,
        orders:orderReducer,
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: false,
        }),


})

export default store;