import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../../CustomHooks/fetchCollectionHook";
import { orders, saveOrders } from "../../../redux/features/OrderSlice/orderSlice";
import { useEffect } from "react";
import Loading from "../../sharedComponents/Loading/Loading";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useFetchCollection('orders');
    const ordersData = useSelector(orders);
    const userId = useSelector(state => state.activeUser.user.uid);
    const navigate=useNavigate();

    useEffect(() => {
        if (!isLoading && data.length > 0) {
            dispatch(saveOrders(data));
        }
    }, [dispatch, data, isLoading]);

    const userOrders = ordersData.filter(order => order.userId === userId);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className="w-[97%] mx-auto mt-5">
                <h2 className="text-2xl md:text-4xl lg:text-6xl">Order History</h2>
                <p className="text-lg lg:text-xl text-slate-500 mt-4">
                    Please Open an order and leave a <span className="font-bold text-slate-700">Product review for others.</span>
                </p>
                <div className="overflow-x-auto">
                    <table className="table table-sm max-w-full">
                        <thead className="border-b-4 border-t-4 border-cyan-400 p-4">
                            <tr>
                                <th className="w-1/6">S/n</th>
                                <th className="w-1/6">Order Date</th>
                                <th className="w-1/6">Order Id</th>
                                <th className="w-1/6">Paid <br/> Amount</th>
                                <th className="w-1/6">Order <br/> Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userOrders.map((order, index) => (
                                <tr onClick={()=>navigate(`/orderDetails/${order.id}`)} key={index} className={index % 2 === 0 ? "bg-slate-200 text-xs hover hover:cursor-pointer" : "bg-white text-xs hover hover:cursor-pointer mb-2"}>
                                    <td className="w-1/6">{index + 1}</td>
                                    <td className="w-1/6">{order.orderDate}</td>
                                    <td className="w-1/6">{order.id}</td>
                                    <td className="w-1/6">${order.orderAmount}</td>
                                    <td className={order.orderStatus!='Delivered'?"w-1/6 font-bold text-warning":"w-1/6 font-bold text-success" }>{order.orderStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};

export default Orders;
