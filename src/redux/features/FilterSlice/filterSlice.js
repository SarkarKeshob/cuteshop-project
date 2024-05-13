import { createSlice } from "@reduxjs/toolkit";

export const filterSlice=createSlice({
    name:'filter',
    initialState:{filteredProducts:[]},
    reducers:{
        filterProducts:(state,action)=>{
            const {products,filter}=action.payload;
            let tempProducts=[...products];
            if(filter.searchKey){
                tempProducts=tempProducts.filter(product=>product.name.toLowerCase().includes(filter.searchKey.toLowerCase())||product.category.toLowerCase().includes(filter.searchKey.toLowerCase())||product.category.toLowerCase().includes(filter.searchKey.toLowerCase())||product.brand.toLowerCase().includes(filter.searchKey.toLowerCase()))
            }
            if(filter.sortKey!=='latest'){
                if(filter.sortKey==='lowest'){
                    tempProducts=tempProducts.slice().sort((a,b)=>{
                        return (a.price-b.price);
                    })
                }
                else if(filter.sortKey==='highest'){
                    tempProducts=tempProducts.slice().sort((a,b)=>{
                        return b.price-a.price ;
                    })
                }
                else if(filter.sortKey==='a-z'){
                    tempProducts=tempProducts.slice().sort((a,b)=>{
                        return a.name.localeCompare(b.name);
                    })
                }
                else{
                    tempProducts=tempProducts.slice().sort((a,b)=>{
                        return b.name.localeCompare(a.name);
                    })
                }
            }
            if(filter.category!='All'){
                tempProducts=tempProducts.filter(product=>product.category===filter.category)
            }
            if(filter.brand!=='All'){
                tempProducts=tempProducts.filter(product=>product.brand===filter.brand)
            }

            state.filteredProducts=tempProducts;

        },

        filterBySearch:(state,action)=>{
            const {products,searchKey}=action.payload;
            let tempProducts=[...products];
            tempProducts=tempProducts.filter(product=>product.name.toLowerCase().includes(searchKey.toLowerCase())||product.category.toLowerCase().includes(searchKey.toLowerCase())||product.category.toLowerCase().includes(searchKey.toLowerCase())||product.brand.toLowerCase().includes(searchKey.toLowerCase()))
            state.filteredProducts=tempProducts;

        }
    }

})


export const {filterProducts,filterBySearch}=filterSlice.actions;

export default filterSlice.reducer;