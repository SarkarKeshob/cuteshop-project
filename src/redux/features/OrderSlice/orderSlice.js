import { createSlice } from "@reduxjs/toolkit";

export const orderSlice=createSlice({
    name:'orders',
    initialState:{
        orders:[]
    },
    reducers:{
        saveOrders:(state,action)=>{
            state.orders=action.payload;
        }
    }
});

export const {saveOrders}=orderSlice.actions;
export const orders=(state)=>state.orders.orders;
export default orderSlice.reducer;