import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice=createSlice({
    name:'checkout',
    initialState:{
        shippingAddress:{},
        billingAddress:{},
    },
    reducers:{
        saveShippingAddress:(state,action)=>{
            state.shippingAddress=action.payload;
        },
        saveBillingAddress:(state,action)=>{
            state.billingAddress=action.payload
        }
    }
})

export const {saveBillingAddress,saveShippingAddress}=checkoutSlice.actions;
export default checkoutSlice.reducer;