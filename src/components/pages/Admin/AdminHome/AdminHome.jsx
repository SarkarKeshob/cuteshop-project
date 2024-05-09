import { AiFillDollarCircle } from "react-icons/ai";
import InfoBox from "./InfoBox/InfoBox";
import { RiLuggageCartLine } from "react-icons/ri";
import { FaCartArrowDown } from "react-icons/fa";

const AdminHome = () => {
    const earning=56656;
    const products=20;
    const orders=10;
    const earningIcon=(<AiFillDollarCircle size={30} className="text-purple-600"></AiFillDollarCircle>);
    const productIcon=(<RiLuggageCartLine size={30} className="text-sky-500" />);
    const orderIcon=(<FaCartArrowDown size={30} className="text-orange-600"/>)
    return (
        <div>
            <h1 className="text-2xl md:text-4xl lg:text-6xl text-slate-500">Admin Home</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 mr-2 md:mr-4 lg:mr-8">
                <InfoBox value={{title:'Earning',count:`$ ${earning}`, borderStyle:' border-t border-b-4 border-purple-600', icon:earningIcon}}></InfoBox>
                <InfoBox value={{title:'Products',count:products, borderStyle:' border-t border-b-4 border-sky-500', icon:productIcon}}></InfoBox>
                <InfoBox value={{title:'Orders',count:orders, borderStyle:' border-t border-b-4 border-orange-600', icon:orderIcon}}></InfoBox>
            </div>
        </div>
    );
};

export default AdminHome;