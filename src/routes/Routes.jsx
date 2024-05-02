import { createBrowserRouter } from "react-router-dom";
import Root from "../components/rootComponent/Root";
import Home from "../components/pages/Home/Home";
import ErrorPage from "../components/pages/Errorpage/ErrorPage";
import Login from "../components/pages/Login/Login";
import Register from "../components/pages/Register/Register";
import Orders from "../components/pages/Orders/Orders"
import Cart from "../components/pages/Cart/Cart"
import Dashboard from "../components/pages/Admin/Dashboard/Dashboard";
import AdminHome from "../components/pages/Admin/AdminHome/AdminHome";
import AdminOrderDetails from "../components/pages/Admin/AdminOrderDetails/AdminOrderDetails";
import AdminOrders from "../components/pages/Admin/AdminOrders/AdminOrders";
import AdminViewProducts from "../components/pages/Admin/AdminViewProducts/AdminViewProducts";
import ChangeOrderStatus from "../components/pages/Admin/ChangeOrderStatus/ChangeOrderStatus";
import AdminAddProducts from "../components/pages/Admin/AdminAddProducts/AdminAddProducts";
import ProductDetails from "../components/pages/Home/HomeContent/Products/ProductDetails/ProductDetails"

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/orders',
                element: <Orders></Orders>
            },
            {
                path:'/productDetails/:id',
                element:<ProductDetails></ProductDetails>
            },

            {
                path: '/cart',
                element: <Cart></Cart>
            },
            {
                path: '/admin',
                element: <Dashboard></Dashboard>,
                children: [
                    {
                        path: '/admin/home',
                        element: <AdminHome></AdminHome>
                    },
                    {
                        path: '/admin/addProducts/:pageKey',
                        element: <AdminAddProducts></AdminAddProducts>
                    },
                    {
                        path: '/admin/orderDetails',
                        element: <AdminOrderDetails></AdminOrderDetails>
                    },
                    {
                        path: '/admin/orders',
                        element: <AdminOrders></AdminOrders>
                    },
                    {
                        path: '/admin/viewProducts',
                        element: <AdminViewProducts></AdminViewProducts>
                    },
                    {
                        path: '/admin/changeOrderStatus',
                        element: <ChangeOrderStatus></ChangeOrderStatus>
                    }
                ]
            }


        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    }
])

export default routes