import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './Components/Signup'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Components/Login'
import Otp from './Components/Otp';
import AuthState from './context/auth/authState';
import CategoryState from './context/category/categoryState';
import Dashboard from './Components/Dashboard';
import Menu from './Components/Menu'
import Orders from './Components/Orders'
import Category from './Components/Category';
import EditCategory from './Components/EditCategory';
import Outletdetails from './Components/Outletdetails';
import { ToastContainer } from 'react-toastify';
import SidebarState from './context/sidebar/sidebarState'
import OrderItem from './Components/OrderItem';
import OrderState from './context/orders/orderState';
import Profile from './Components/Profile';
import Analytics from './Components/Analytics';
import ChartState from './context/chart/chartState';
import OutletState from './context/outlet/outletState';
import ErrorPage from './Components/ErrorPage';
import ResetPassword from './Components/ResetPassword';
import OrderHistory from './Components/OrderHistory';
import AllOrders from './Components/AllOrders'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/otp",
        element: <Otp />,
    },
    {
        path: "/category",
        element: <Category />
    },
    {
        path: "/orderitem",
        element: <OrderItem />
    },
    {
        path: "/resetpassword",
        element: <ResetPassword />
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children:[
            {
                path:"menu",
                element:<Menu/>
            },
            {
                path:"orders/handling",
                element:<Orders/>
            },
            {
                path:"orders/history",
                element:<OrderHistory/>
            },
            {
                path:"orders/allorders",
                element:<AllOrders/>
            },
            {
                path:"outlet/edit",
                element:<Outletdetails/>
            },
            {
                path: "editcategory/:id",
                element: <EditCategory />
            },
            {
                path:"outletdetails",
                element:<Outletdetails/>
            },
            {
                path: "addcategory",
                element: <EditCategory />
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "analytics",
                element: <Analytics />
            },
            {
                path: "*",
                element: <ErrorPage />
            },
        ]
    },
    {
        path: "*",
        element: <ErrorPage />
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer closeOnClick draggable pauseOnHover />
    <ChartState>
      <OutletState>
        <OrderState>
          <SidebarState>
            <CategoryState>
              <AuthState>
                <RouterProvider router={router} />
              </AuthState>
            </CategoryState>
          </SidebarState>
        </OrderState>
      </OutletState>
    </ChartState>
  </React.StrictMode>
);