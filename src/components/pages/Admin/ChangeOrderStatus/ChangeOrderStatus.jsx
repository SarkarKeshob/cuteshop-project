import { useState } from "react";
import Loading from "../../../sharedComponents/Loading/Loading";
import PropTypes from 'prop-types';
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ChangeOrderStatus = ({ value }) => {
    const { id, orderDetails } = value;
    console.log(orderDetails)
    const navigate=useNavigate();
    const [status, setstatus] = useState('');
    const [loading, setLoading] = useState(false);
    const updateOrderStatus = async(e, orderId) => {
        e.preventDefault();
        setLoading(true);
        const orderData = {
            orderDate: orderDetails.orderDate,
            orderTime: orderDetails.orderTime,
            userEmail:orderDetails.userEmail,
            userId:orderDetails.userId,
            orderAmount: orderDetails.orderAmount,
            orderItems: orderDetails.orderItems,
            orderStatus: status,
            shippingAddress:orderDetails.shippingAddress,
            createdAt: orderDetails.createdAt,
            updatedAt:Timestamp.now().toDate(),

        }
        try {
            await setDoc(doc(db,"orders",orderId),orderData);
            toast.success('Order Status Changed Successfully', {
                autoClose: 2000,
                position: "top-left",
            });
            setLoading(false);
            navigate('/admin/orders')
        }
        catch (error) {
            setLoading(false);
            toast.error(error.message, {
                autoClose: 2000,
            })
        }

    }

if (loading) {
    return <Loading></Loading>
}
else {
    return (
        <div className=" border-2 border-sky-500 card w-full lg:w-4/6 bg-base-100 shadow-xl mt-8 p-5">
            <div className="card-body">
                <h2 className="card-title text-xl lg:text-2xl">Change Order Status</h2>
                <form onSubmit={(e) => updateOrderStatus(e, id)} className="mt-2">
                    <div>
                        <select value={status} onChange={(e) => setstatus(e.target.value)} className="w-full lg:w-2/3 py-3 border-2 border-slate-600 rounded grid">
                            <option value={''} disabled>---Select One---</option>
                            <option value={'Order Placed'}  >Order Placed</option>
                            <option value={'Processing'}  >Processing</option>
                            <option value={'Order Shipped'} >Order Shipped</option>
                            <option value={'Delivered'} >Delivered</option>
                        </select>
                    </div>
                    <div className="card-actions justify-start mt-4">
                        <button className="btn btn-info">Update Status</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
};
ChangeOrderStatus.propTypes = {
    value: PropTypes.object,
}
export default ChangeOrderStatus;