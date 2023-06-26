import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './Components/Signup'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Components/Login'
import Otp from './Components/Otp';
import AuthState from './context/auth/authState';
import Dashboard from './Components/Dashboard';
import Menu from './Components/Menu'
import Orders from './Components/Orders'
import Outlet from './Components/Outlet'
import  MenuItem  from './Components/MenuItem';


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
        path: "/menuitem",
        element: <MenuItem />
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
                path:"orders",
                element:<Orders/>
            },
            {
                path:"outlet",
                element:<Outlet/>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthState>
            <RouterProvider router={router} />
        </AuthState>
    </React.StrictMode>
);
