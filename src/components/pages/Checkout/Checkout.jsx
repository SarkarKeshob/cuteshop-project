import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Checkout = () => {
   
   return (
      <div className="w-fit mx-auto shadow-2xl px-5 py-10 md:px-7 md:py-16 lg:px-10 lg:py-20 mt-7">
         <h2 className="text-3xl md:text-5xl lg:text-7xl mb-7">Checkout Successful </h2>
         <p className="text-lg md:text-2xl lg:text-4xl mb-7">Thank you for your purchase.</p>
         <div className="w-4/6 flex justify-between">
            <Link to={'/#home'} className="btn btn-warning flex items-center"> <FaArrowLeft></FaArrowLeft> Get Back To Shopping</Link>
            <Link to={'/orders'} className="btn btn-info flex items-center">View Order Status <FaArrowRight></FaArrowRight> </Link>
         </div>
      </div>
   )
};

export default Checkout;