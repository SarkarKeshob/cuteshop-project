import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../../../CustomHooks/fetchDocument";
import { useEffect, useState } from "react";
import Loading from "../../../sharedComponents/Loading/Loading";
import { FaArrowLeft } from "react-icons/fa";
import ChangeOrderStatus from "../ChangeOrderStatus/ChangeOrderStatus";

const AdminOrderDetails = () => {
    const { id } = useParams();
    const { selectedData, loading, error } = useFetchDocument('orders', id);
    const [orderDetails, setOrderDetails] = useState({});
    useEffect(() => {
        setOrderDetails(selectedData);
    }, [selectedData]);
    if (loading) {
        return (
            <Loading></Loading>
        );
    }
    else if (error) {
        return (
            <h2 className="text-6xl text-red-600 text-center min-h-screen mt-10">
                {error}
            </h2>
        )
    }

    else {
        return (
            <>
                {orderDetails?.orderItems?.length ? (
                    <div className="w-[96%] mx-auto">
                        <h1 className="text-2xl md:text-4xl lg:text-6xl mt-6">Order Details</h1>
                        <div className="text-sm md:text-base lg:text-lg">
                            <Link className="flex items-center my-5" to={'/admin/orders'}><FaArrowLeft /> Back To Orders </Link>
                            <p className="font-bold text-slate-800">Order Id: <span className="text-slate-500 font-medium">{id}</span></p>
                            <p className="font-bold text-slate-800">Ordered on: <span className="text-slate-500 font-medium">{orderDetails.orderDate}</span></p>
                            <p className="font-bold text-slate-800">Paid Amount: <span className="text-slate-500 font-medium">$ {orderDetails.orderAmount}</span></p>
                            <p className="font-bold text-slate-800">Order Status: <span className="text-slate-500 font-medium">{orderDetails.orderStatus}</span></p>
                            <div className="font-bold text-slate-800">
                                <p>Shipping Address:</p>
                                <p className="text-slate-500 text-sm font-medium">Address: {orderDetails.shippingAddress.line1}<br /> {orderDetails.shippingAddress.line2} </p>
                                <p className="text-slate-500 text-sm font-medium">State: {orderDetails.shippingAddress.state} </p>
                                <p className="text-slate-500 text-sm font-medium">Country: {orderDetails.shippingAddress.country} </p>
                            </div>

                        </div>
                        <div className="overflow-x-auto mt-8">
                            <table className="table table-sm max-w-full">
                                <thead className="border-b-4 border-t-4 border-cyan-400 p-4 ">
                                    <tr className="font-bold">
                                        <th className="w-1/7">S/n</th>
                                        <th className="w-1/7">Product</th>
                                        <th className="w-1/7">Price</th>
                                        <th className="w-1/7">Quantity</th>
                                        <th className="w-1/7">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {orderDetails.orderItems?.length && orderDetails.orderItems?.map((item, index) => <tr key={index} className={index % 2 === 0 ? "bg-slate-200 text-xs hover" : "bg-white text-xs hover mb-2"}>
                                        <th className="w-1/7">{index + 1}</th>
                                        <td className="w-1/7">
                                            <div>
                                                <p className="font-bold">{item.name}</p>
                                                <img className="w-32 h-20  md:h-24 lg:h-28 mt-4" src={item.imageURL} alt={item.name} />
                                            </div>
                                        </td>
                                        <td className="w-1/7">${item.price}</td>
                                        <td className="w-1/7">{item.cartQuantity}</td>
                                        <td className="w-1/7">${(Number(item.cartQuantity)) * item.price}</td>
                                    </tr>)}
                                </tbody>
                            </table>

                            <ChangeOrderStatus value={{orderDetails,id}}></ChangeOrderStatus>
                        </div>
                    </div>
                )
                    : <Loading></Loading>}
            </>
        );
    }
};

export default AdminOrderDetails;