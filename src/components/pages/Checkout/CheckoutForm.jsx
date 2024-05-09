import { useDispatch, useSelector } from "react-redux";
import CheckoutSummary from "./CheckoutSummary";
import { useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { clearCart } from "../../../redux/features/CartSlice/cartSlice";

const CheckoutForm = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const cartTotalAmount = useSelector(state => state.cart.cartAmount);
    const shippingAddress = useSelector(state => state.checkout.shippingAddress);
    const userEmail = useSelector(state => state.activeUser.user.userEmail);
    const userId = useSelector(state => state.activeUser.user.uid);
    const [confirmText, setConfirmText] = useState('');
    const dispatch=useDispatch();
    const navigate =useNavigate();
    const handleSaveOrder=async (e)=>{
        e.preventDefault();
        const today=new Date();
        const date=today.toDateString();
        const time=today.toLocaleTimeString();
        const orderData={
            orderDate:date,
            orderTime:time,
            userEmail,
            userId,
            orderAmount:cartTotalAmount,
            orderItems:cartItems,
            orderStatus:'Order Placed',
            shippingAddress,
            createdAt:Timestamp.now().toDate(),

        }
        try{
            await addDoc(collection(db,'orders'),orderData);
            dispatch(clearCart());
            toast.success('Order Placed Successfully',{
                autoClose:2000,
                position:"top-left",
            });

            navigate('/checkout')
        }
        catch(error){
            toast.error(error.message,{
                autoClose:2000,
            })
        }

    }

    if(shippingAddress.name){
        return (
            <div className="w-full lg:w-5/6 mx-auto">
                <h1 className="text-2xl md:text-4xl lg:text-6xl">Proceed to Checkout</h1>
                <div className="lg:flex lg:justify-between grid ">
                    <div className="w-full lg:w-3/5 mr-10">
                        <CheckoutSummary></CheckoutSummary>
    
                    </div>
                    <div className="w-full lg:w-3/5 shadow-2xl bg-white p-10 rounded mt-10">
                        <div className="w-fit mb-6">
                            <h4 className="text-xl md:text-2xl lg:text-3xl border-b-2 w-fit pr-5 pb-3 mb-5">Shipping Address</h4>
                            <p>Recipent Name: {shippingAddress.name}</p>
                            <p>Recipent Address: {shippingAddress.line1} {shippingAddress.line2}</p>
                            <p>Recipent Phone Number: {shippingAddress.Phone}</p>
                            <p>Recipent Country: {shippingAddress.country}</p>
                            <p>Recipent State: {shippingAddress.state}</p>
                            <p>Recipent City: {shippingAddress.city}</p>
                        </div>
                    </div>
                </div>
                <div className="w-5/6 lg:w-3/5 mx-auto p-8 lg:p-16 shadow-2xl bg-white mt-10">
                    <form action="" onSubmit={handleSaveOrder} className="form grid w-fit gap-5 mx-auto">
                        <p className="text-lg lg:text-2xl">Type Confirm to Proceed Checkout.</p>
                        <input className="input input-bordered" placeholder="Confirm" onChange={(e) => setConfirmText(e.target.value)} type="text" />
                        <button className="btn btn-accent w-1/2 mx-auto" disabled={confirmText !== 'Confirm'}>Proceed To Checkout</button>
                    </form>
                </div>
            </div>
        );
    }
    else{
        return <Navigate to={'/checkoutDetails'}></Navigate>
    }
};

export default CheckoutForm;