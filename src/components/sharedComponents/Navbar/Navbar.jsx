import { Link, NavLink } from "react-router-dom";
import { FaShopify, FaShoppingCart } from "react-icons/fa";
import { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logOutUser, } from "../../../redux/features/AuthSlice/authSlice";
import Loading from "../Loading/Loading";
import { calculateTotalQuantityAndPrice } from "../../../redux/features/CartSlice/cartSlice";

const Navbar = () => {

    const cartItemsQuantity = useSelector(state => state.cart.cartItemsQuantity);
    const cartItems = useSelector(state => state.cart.cartItems);

    const active = 'text-orange-500 underline font-bold hover:text-accent flex items-center';

    const activeUser = useSelector(state => state.activeUser.user);
    const loadCondition = useSelector(state => state.activeUser.loading);
    const dispatch = useDispatch();

    const navLinks = (
        <>
            <NavLink to={'/'} className={({ isActive }) => isActive ? active : 'hover:text-accent'}>Home</NavLink>
            <NavLink to={'/contact'} className={({ isActive }) => isActive ? active : 'hover:text-accent'}>Contact Me</NavLink>
            <NavLink to={'/orders'} className={({ isActive }) => isActive ? active : 'hover:text-accent'}>My Orders</NavLink>
            <NavLink to={'/cart'} className={({ isActive }) => isActive ? 'text-orange-500 font-bold hover:text-accent flex items-center' : 'hover:text-accent flex items-center'}> Cart <FaShoppingCart className="text-lg ml-1"></FaShoppingCart><span className="-mt-4 ml-1 text-sm font-bold no-underline">{cartItemsQuantity}</span> </NavLink>
        </>
    )


    const handleLogout = () => {
        dispatch(logOutUser())
    }
    useEffect(() => {
        dispatch(calculateTotalQuantityAndPrice());
    }, [dispatch, cartItems]);
    useEffect(() => {
        dispatch(fetchUser());


    }, [dispatch]);
    return (
        <div className="static sticky top-0 z-50">
            {loadCondition && <Loading></Loading>}
            <div className="navbar bg-cyan-950 text-white grid md:grid-cols-2 lg:grid-cols-8 items-center py-5 px-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-cyan-950 rounded-box w-52 text-white">
                            <div className="grid gap-4">
                                {navLinks}
                            </div>
                        </ul>
                    </div>
                    <Link className=" text-xl font-extrabold flex"><span className="text-2xl"> <FaShopify /></span>cute<span className="mr-0 text-orange-500">Shop</span>.</Link>
                </div>
                <div className="hidden lg:grid lg:col-span-4 lg:justify-end items-center">
                    <ul className="flex justify-between items-center px-1 gap-5">
                        {navLinks}
                    </ul>
                </div>

                <div className="flex lg:col-span-3 justify-end lg:justify-end items-center gap-4">
                    <div>
                        {(activeUser?.userName) ? <h2>Welcome <span className="text-orange-500 text-sm">{activeUser.userName}</span></h2> : ''}
                    </div>
                    <div>{activeUser?.userEmail == 'keshob.sarkar.shuvo@gmail.com' ? <Link className="btn btn-info" to={'/admin'}>Admin</Link> : ''}</div>
                    <div>{activeUser?.userEmail ? <button className="btn btn-accent" onClick={handleLogout}>Logout</button> : <Link className="btn btn-warning" to={'/login'}>Login</Link>}</div>

                </div>

            </div>
        </div>
    );
};

export default Navbar;