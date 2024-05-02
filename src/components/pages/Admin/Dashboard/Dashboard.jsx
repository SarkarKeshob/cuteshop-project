import { Outlet, useLocation, useNavigate, } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { useEffect } from "react";
const Dashboard = () => {
    const location=useLocation();
    const navigate=useNavigate();

    useEffect(()=>{
    if(location.pathname==='/admin'){
        navigate('/admin/home')
    }
    else{
        navigate(`${location.pathname}`)
    }
    },[])
    return (
        <div className="grid grid-cols-8 gap-10">
            <div className="col-span-2">
                <AdminNavbar></AdminNavbar>
            </div>
            <div className="col-span-6">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;