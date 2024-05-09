import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, } from "react-router-dom";
import { addToCart, calculateTotalQuantityAndPrice, clearCart, decreaseCartQuantity, deleteFromCart } from "../../../redux/features/CartSlice/cartSlice";
import { useEffect } from "react";

const Cart = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const cartAmount=useSelector(state=>state.cart.cartAmount);
    const cartQuantity=useSelector(state=>state.cart.cartItemsQuantity);
    const dispatch=useDispatch();
    const increaseQuantity=(cartProduct)=>{
        dispatch(addToCart(cartProduct));
    }

    const decreaseQuantity=(cartProduct)=>{
        dispatch(decreaseCartQuantity(cartProduct))
    }

    const deleteItemFromCart=(cartProduct)=>{
        dispatch(deleteFromCart(cartProduct));
    }
    const clearTheCart=()=>{
        dispatch(clearCart())
    }

    useEffect(()=>{
        dispatch(calculateTotalQuantityAndPrice());
    },[dispatch,cartItems])

    return (
        <div>
            <h2 className="text-2xl md:text-3xl lg:text-5xl">Shopping Cart </h2>
            <div className="mt-10">
                {cartItems.length == 0 ? (
                    <>
                        <p>No products in your cart.</p>
                        <Link className="flex items-center" to={'/#home'}><FaArrowLeft></FaArrowLeft> Continue Shopping</Link>
                    </>) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="table w-[95%] mx-auto">
                                {/* head */}
                                <thead className="border-t-4 border-b-4 border-teal-400 shadow-xl font-bold ">
                                    <tr>
                                        <th>S/n</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => <tr key={index} className={index % 2 === 0 ? " text-xs md:text-sm lg:text-base bg-slate-200" : "bg-white text-xs md:text-sm lg:text-base"}>
                                        <th>{index + 1}</th>
                                        <td className="w-1/5">
                                            <Link to={`/productDetails/${item.id}`}>
                                                <p className="font-bold mb-3">{item.name}</p>
                                                <div>
                                                    <img src={item.imageURL} alt="" className="h-12 md:h-16 lg:h-24 w-1/2 border border-slate-200" />
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="text-orange-600">{item.price} $</td>
                                        <td>
                                            <div className="flex items-center w-fit">
                                                <button className="btn" onClick={()=>decreaseQuantity(item)}>-</button>
                                                <p className="p-6 font-bold">{item.cartQuantity}</p>
                                                <button className="btn" onClick={()=>increaseQuantity(item)}>+</button>
                                            </div>
                                        </td>
                                        <td className="text-orange-600">{((item.cartQuantity) * (item.price)).toFixed(2)} $</td>
                                        <td className="text-red-500" onClick={()=>deleteItemFromCart(item)}><FaTrashAlt size={20}></FaTrashAlt></td>
                                    </tr>)}
                                </tbody>
                            </table>
                            <div className="mx-20 mt-10 flex justify-between items-center">
                                <button className="btn btn-error bg-orange-600 text-white " onClick={clearTheCart}>Clear Cart</button>
                                <Link className="flex items-center btn btn-ghost" to={'/#home'}><FaArrowLeft></FaArrowLeft> Continue Shopping</Link>

                            </div>
                            <div className="border border-slate-600 w-full lg:w-1/3 p-7 ml-auto mr-5 mt-5">
                                <p className="text-xl text-slate-500 mb-2">Cart Item(s)  <span>{cartQuantity}</span></p>
                                <p className="text-xl md:text-2xl lg:text-4xl font-bold my-1 flex justify-between">Sub Total <span className="text-orange-500 my-1">$ {cartAmount}</span></p>
                                <p className="text-lg text-slate-500 my-1">Taxes and Shipping charges are calculated at checkout  </p>
                                <Link className="btn btn-info w-full mt-2" to={'/checkoutDetails'}>Checkout</Link>
                            </div>
                        </div>
                    </>)}
            </div>
        </div>
    );
};

export default Cart;
