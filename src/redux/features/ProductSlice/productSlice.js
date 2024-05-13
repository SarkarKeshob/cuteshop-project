import { createSlice } from "@reduxjs/toolkit";

export const productSlice=createSlice({
    name:'products',
    initialState:{
        products:[],
        maxPrice:null,
        minPrice:null,
    },
    reducers:{
        saveProducts:(state,action)=>{
            state.products=action.payload;
        },
        getPriceRange:(state,action)=>{
            const {products}=action.payload;
            const priceArray=products.map(product=>product.price);
            state.maxPrice=Math.max(...priceArray);
            state.minPrice=Math.min(...priceArray);

        }
    }
});

export const {saveProducts,getPriceRange}=productSlice.actions;
export default productSlice.reducer;