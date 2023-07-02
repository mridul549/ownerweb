import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Menu from "./Menu";
import Orders from "./Orders";
import Outlet from "./Outlet";
import '../css/dashboard.css'
import EditCategory from "./EditCategory";
import Outletdetails from "./Outletdetails";
import Navbar from "./Navbar";

export default function Dashboard() {
    return (
        <div className="container-fluid">
            {/* <Navbar/> */}
            <div className="row">
                <div className="col-lg-2 sidebar">
                    <Sidebar />
                </div>
                <div className="col-lg-10 div-2 mt-5">
                    <Routes>
                        <Route path="/" element={<Menu />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/outlet" element={<Outlet />} />
                        <Route path="/editcategory" element={<EditCategory />} />
                        <Route path="/outletdetails" element={<Outletdetails/>}/>
                        <Route path="/addcategory" element={<EditCategory />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
