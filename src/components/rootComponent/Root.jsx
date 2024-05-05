import { Outlet } from "react-router-dom";
import Navbar from "../sharedComponents/Navbar/Navbar";
import Footer from "../sharedComponents/Footer/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
    return (
        <div className="bg-slate-50">
            <ToastContainer />

            <Navbar></Navbar>
            <div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>

        </div>
    );
};

export default Root;