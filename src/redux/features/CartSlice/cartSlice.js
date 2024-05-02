import { createSlice } from "@reduxjs/toolkit";
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const initialState = {
    cartItems: cartItemsFromStorage,
    cartItemsQuantity: cartItemsFromStorage.length,
    cartAmount: cartItemsFromStorage.length > 0 ? cartItemsFromStorage.reduce((accumulator, currentValue) => accumulator + currentValue.price) : 0
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            
        }
    }

})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;