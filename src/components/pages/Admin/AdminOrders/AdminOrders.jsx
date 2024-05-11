import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../../../CustomHooks/fetchCollectionHook";
import { saveOrders, selectOrders } from "../../../../redux/features/OrderSlice/orderSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../../sharedComponents/Loading/Loading";

const AdminOrders = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useFetchCollection('orders');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && data.length > 0) {
            dispatch(saveOrders(data));
        }
    }, [dispatch, data, isLoading]);
    const ordersData = useSelector(selectOrders);


    if (isLoading) {
        return <Loading />;
    }
     else {
        return (
            <div className="w-[97%] mx-auto mt-5">
                <h2 className="text-2xl md:text-4xl lg:text-6xl">All Orders</h2>
                <p className="text-sm md:text-base lg:text-lg text-slate-500">
                    Open an order<span className="font-bold text-slate-700"> to change order status.</span>
                </p>
                <div className="overflow-x-auto mt-10">
                    <table className="table table-sm max-w-full">
                        <thead className="border-b-4 border-t-4 border-cyan-400 p-4">
                            <tr>
                                <th className="w-1/6">S/n</th>
                                <th className="w-1/6">Order Date</th>
                                <th className="w-1/6">Order Id</th>
                                <th className="w-1/6">Paid <br /> Amount</th>
                                <th className="w-1/6">Order <br /> Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersData.map((order, index) => (
                                <tr onClick={() => navigate(`/admin/orderDetails/${order.id}`)} key={index} className={index % 2 === 0 ? "bg-slate-200 text-xs hover hover:cursor-pointer" : "bg-white text-xs hover hover:cursor-pointer mb-2"}>
                                    <td className="w-1/6">{index + 1}</td>
                                    <td className="w-1/6">{order.orderDate}</td>
                                    <td className="w-1/6">{order.id}</td>
                                    <td className="w-1/6">${order.orderAmount}</td>
                                    <td className={order.orderStatus != 'Delivered' ? "w-1/6 font-bold text-warning" : "w-1/6 font-bold text-success"}>{order.orderStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};

export default AdminOrders;