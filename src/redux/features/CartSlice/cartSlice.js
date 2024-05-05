import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const removeItemFromCart = (state, action) => {
    return (state.cartItems.filter(item => item.id !== action.payload.id));
}
const initialState = {
    cartItems: cartItemsFromStorage,
    cartItemsQuantity: 0,
    cartAmount: 0
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productIndex = state.cartItems.findIndex(item => item.id == action.payload.id);
            if (productIndex >= 0) {
                state.cartItems[productIndex].cartQuantity += 1;
                toast.info(`${action.payload.name}'s quantity is increased in the cart`, {
                    position: 'top-left',
                    autoClose: 2000,

                })
            }
            else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} Added to cart`, {
                    position: 'top-left',
                    autoClose: 2000,

                })
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },

        decreaseCartQuantity: (state, action) => {
            const productIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (state.cartItems[productIndex].cartQuantity > 1) {
                state.cartItems[productIndex].cartQuantity -= 1;
                toast.info(`${action.payload.name}'s quantity is decreased by one.`, {
                    autoClose: 2000,
                });
            }
            else {
                const newCart = removeItemFromCart(state, action);
                state.cartItems = newCart;
                toast.error(`${action.payload.name} has been removed from cart `, {
                    autoClose: 2000,
                })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        deleteFromCart: (state, action)=>{
            const newCart = removeItemFromCart(state, action);
            state.cartItems = newCart;
            toast.error(`${action.payload.name} has been removed from cart `, {
                autoClose: 2000,
            })
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        clearCart:(state)=>{
            state.cartItems=[];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            toast.error(`Cart has been cleared `, {
                autoClose: 2000,
            })            

        },
        calculateTotalQuantityAndPrice:(state)=>{
            const totalPriceArray=[];
            const totalQuantityArray=[]
            state.cartItems.map(item=>{
                const totalprice=(Number(item.cartQuantity)*Number(item.price));
                totalPriceArray.push(totalprice);
                totalQuantityArray.push(Number(item.cartQuantity));
            });
            const subTotal=totalPriceArray.reduce((a,b)=>{
                return a+b;
            },0);
            const totalQuantity=totalQuantityArray.reduce((a,b)=>{
                return a+b;
            },0)
            state.cartAmount=subTotal.toFixed(2);
            state.cartItemsQuantity=totalQuantity;
        },
    }


})

export const { addToCart, decreaseCartQuantity,deleteFromCart,clearCart,calculateTotalQuantityAndPrice} = cartSlice.actions;
export default cartSlice.reducer;