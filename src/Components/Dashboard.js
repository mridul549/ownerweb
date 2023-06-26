import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Menu from "./Menu";
import Orders from "./Orders";
import Outlet from "./Outlet";
import '../css/dashboard.css'

export default function Dashboard() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <Sidebar />
                </div>
                <div className="col-lg-9">
                    <Routes>
                        <Route path="/" element={<Menu />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/outlet" element={<Outlet />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
