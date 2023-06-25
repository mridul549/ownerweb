import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './Components/Signup'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Components/Login'
import Otp from './Components/Otp';
import AuthState from './context/auth/authState';
import { Provider } from 'react-redux'
import { store } from './state/store'

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthState>
                <RouterProvider router={router} />
            </AuthState>
        </Provider>
    </React.StrictMode>
);
