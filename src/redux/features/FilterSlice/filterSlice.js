import { createSlice } from "@reduxjs/toolkit";

export const filterSlice=createSlice({
    name:'filter',
    initialState:{filteredProducts:[]},
    reducers:{
        filterBySearch:(state,action)=>{
            const {products,searchKey}=action.payload;
            const tempProducts=products.filter(product=>product.name.toLowerCase().includes(searchKey.toLowerCase())||product.category.toLowerCase().includes(searchKey.toLowerCase())||product.description.toLowerCase().includes(searchKey.toLowerCase()));

            state.filteredProducts=tempProducts;

        },

        sortProducts:(state,action)=>{
            const {products,sortKey}=action.payload;
            let tempProducts=[];
            if(sortKey==='latest'){
                tempProducts=products;
            }
            if(sortKey==='lowest'){
                tempProducts=products.slice().sort((a,b)=>a.price-b.price);
            }
            if(sortKey==='highest'){
                tempProducts=products.slice().sort((a,b)=>b.price-a.price);
            }
            if(sortKey==='a-z'){
                tempProducts=products.slice().sort((a,b)=>a.name.localeCompare(b.name));
            }
            if(sortKey==='z-a'){
                tempProducts=products.slice().sort((a,b)=>b.name.localeCompare(a.name));
            }
            state.filteredProducts=tempProducts;
        },
        filterByCategory:(state,action)=>{
            const {products,category}=action.payload;
            let tempProducts=[];
            if(category==='All'){
                tempProducts=products;
            }
            else{
                tempProducts=products.filter(product=>product.category===category);
            }
            state.filteredProducts=tempProducts;
        },
        filterByBrands:(state,action)=>{
            const {products,brand}=action.payload;
            let tempProducts=[];
            if(brand==='All'){
                tempProducts=products;
            }
            else{
                tempProducts=products.filter(product=>product.brand===brand);
            }
            state.filteredProducts=tempProducts;
        },
        filterByPrice:(state,action)=>{
            const {products,price}=action.payload;
            const tempProducts=products.filter(product=>product.price<=price);
            state.filteredProducts=tempProducts;
            
        }
    }

})


export const {filterBySearch,sortProducts,filterByCategory,filterByBrands,filterByPrice}=filterSlice.actions;

export default filterSlice.reducer;