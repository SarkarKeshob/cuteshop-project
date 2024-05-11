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
import Checkout from "../components/pages/Checkout/Checkout";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import CheckoutDetails from "../components/pages/Checkout/CheckoutDetails";
import CheckoutForm from "../components/pages/Checkout/CheckoutForm";
import OrderDetails from "../components/pages/Orders/OrderDetails";
import ReviewProducts from "../components/sharedComponents/ReviewProducts/ReviewProducts";
import AdminOnlyRoutes from "./AdminOnlyRoutes/AdminOnlyRoutes";
import ContactMe from "../components/pages/Contactme/ContactMe";
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
                path: '/orderDetails/:id',
                element: <OrderDetails></OrderDetails>
            },
            {
                path:'/productDetails/:id',
                element:<ProductDetails></ProductDetails>
            },
            {
                path:'/reviewProduct/:id',
                element:<ReviewProducts></ReviewProducts>
            },
            {
                path:'/checkout',
                element:<PrivateRoute><Checkout></Checkout></PrivateRoute>
            },
            {
                path:'/checkoutDetails',
                element:<PrivateRoute><CheckoutDetails></CheckoutDetails></PrivateRoute>
            },
            {
                path:'/checkoutForm',
                element:<PrivateRoute><CheckoutForm></CheckoutForm></PrivateRoute>
            },
            {
                path:'/contact',
                element:<PrivateRoute><ContactMe></ContactMe></PrivateRoute>
            },

            {
                path: '/cart',
                element: <Cart></Cart>
            },
            {
                path: '/admin',
                element: <AdminOnlyRoutes><Dashboard></Dashboard></AdminOnlyRoutes>,
                children: [
                    {
                        path: '/admin/home',
                        element: <AdminOnlyRoutes><AdminHome></AdminHome></AdminOnlyRoutes>
                    },
                    {
                        path: '/admin/addProducts/:pageKey',
                        element: <AdminOnlyRoutes><AdminAddProducts></AdminAddProducts></AdminOnlyRoutes>
                    },
                    {
                        path: '/admin/orderDetails/:id',
                        element: <AdminOnlyRoutes><AdminOrderDetails></AdminOrderDetails></AdminOnlyRoutes>
                    },
                    {
                        path: '/admin/orders',
                        element: <AdminOnlyRoutes><AdminOrders></AdminOrders></AdminOnlyRoutes>
                    },
                    {
                        path: '/admin/viewProducts',
                        element: <AdminOnlyRoutes><AdminViewProducts></AdminViewProducts></AdminOnlyRoutes>
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