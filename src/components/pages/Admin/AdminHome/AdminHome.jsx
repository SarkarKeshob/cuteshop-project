import { AiFillDollarCircle } from "react-icons/ai";
import InfoBox from "./InfoBox/InfoBox";
import { RiLuggageCartLine } from "react-icons/ri";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotalOrders, saveOrders, selectOrders, selectTotalOrderAmount } from "../../../../redux/features/OrderSlice/orderSlice";
import useFetchCollection from "../../../../CustomHooks/fetchCollectionHook";
import { useEffect } from "react";
import { setProducts } from "../../../../redux/features/ProductSlice/productSlice";
import Loading from "../../../sharedComponents/Loading/Loading";
import Chart from "./Chart/Chart";

const AdminHome = () => {
    const product = useSelector(state => state.products.products);
    const order = useSelector(selectOrders);
    const earning = useSelector(selectTotalOrderAmount);
    const dispatch = useDispatch();
    const products = useFetchCollection('products');
    const orders = useFetchCollection('orders');
    console.log(order);
    useEffect(() => {
        dispatch(saveOrders(orders.data));
        dispatch(setProducts(products.data));
        dispatch(calculateTotalOrders());
    }, [dispatch, orders.data, products.data])
    console.log(earning);
    const earningIcon = (<AiFillDollarCircle size={30} className="text-purple-600"></AiFillDollarCircle>);
    const productIcon = (<RiLuggageCartLine size={30} className="text-sky-500" />);
    const orderIcon = (<FaCartArrowDown size={30} className="text-orange-600" />)
    if (products.isLoading || orders.isLoading) {
        return (
            <Loading></Loading>
        );
    }
    else if (products.isError || orders.isError) {
        return (
            <h2 className="text-5xl text-red-600 min-h-screen text-center">Something went wrong!!! Try Realoding again.</h2>
        );

    }
    else {
        return (
            <div>
                {orders.data.length && products.data.length &&order.length ? (
                    <>
                        <h1 className="text-2xl md:text-3xl lg:text-5xl text-slate-500">Admin Home</h1>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 mr-2 md:mr-4 lg:mr-8">
                            <InfoBox value={{ title: 'Earning', count: `$ ${earning}`, borderStyle: ' border-t border-b-4 border-purple-600', icon: earningIcon }}></InfoBox>

                            <InfoBox value={{ title: 'Products', count: (product.length), borderStyle: ' border-t border-b-4 border-sky-500', icon: productIcon }}></InfoBox>

                            <InfoBox value={{ title: 'Orders', count: (order.length), borderStyle: ' border-t border-b-4 border-orange-600', icon: orderIcon }}></InfoBox>
                        </div>
                        <div className="mt-10">
                            {order?.length>0 && <Chart value={order}></Chart>}
                        </div>
                    </>
                ) : <Loading></Loading>}
            </div>
        );
    }
};

export default AdminHome;