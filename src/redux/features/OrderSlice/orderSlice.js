import { createSlice } from "@reduxjs/toolkit";

export const orderSlice=createSlice({
    name:'orders',
    initialState:{
        orders:[],
        totalOrderAmount:0,
    },
    reducers:{
        saveOrders:(state,action)=>{
            state.orders=action.payload;
        },
        calculateTotalOrders:(state)=>{
            const priceArray=state.orders.map(order=>Number(order.orderAmount));
            const totalPrice=priceArray.reduce((a,b)=>{
                return a+b;
            },0)

            state.totalOrderAmount=totalPrice;

        }
    }
});

export const {saveOrders,calculateTotalOrders}=orderSlice.actions;
export const selectOrders=(state)=>state.orders.orders;
export const selectTotalOrderAmount=(state)=>state.orders.totalOrderAmount;
export default orderSlice.reducer;