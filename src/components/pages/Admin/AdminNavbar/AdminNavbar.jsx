import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
    const adminUser = useSelector(state => state.activeUser.user);
    const adminImage = adminUser.userImage;
    const adminName = adminUser.userName;
    const active='border-r-8 border-orange-500';
    return (
        <div>
            {/* Admin Details */}
            <div className="bg-blue-600 p-10">
                <img src={adminImage} className="rounded-full mx-auto w-14 h-14" alt={adminName} />
                <h2 className=" text-xl md:text-2xl text-center font-bold text-white">{adminName}</h2>
            </div>
            {/* navbar */}
            <div>
                <div className="py-2 pl-2  border-b-2 grid">
                    <NavLink className={({ isActive }) => isActive ? active : ''} to={'/admin/home'}>Home</NavLink>
                </div>
                <div className="py-2 pl-2  border-b-2 grid">
                    <NavLink className={({ isActive }) => isActive ? active : ''}  to={'/admin/viewProducts'}>View Products</NavLink>
                </div>
                <div className="py-2 pl-2  border-b-2 grid">
                    <NavLink to={'/admin/addProducts'}/>
                    <NavLink className={({ isActive }) => isActive ? active : ''} to={'/admin/addProducts/Add'}>Add Products</NavLink>
                </div>
                <div className="py-2 pl-2  border-b-2 grid">
                    <NavLink className={({ isActive }) => isActive ? active : ''} to={'/admin/orders'}>View Orders</NavLink>

                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;