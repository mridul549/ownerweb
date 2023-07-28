import { React, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Menu from "./Menu";
import Orders from "./Orders";
import '../css/dashboard.css'
import EditCategory from "./EditCategory";
import Outletdetails from "./Outletdetails";
import SidebarContext from "../context/sidebar/sidebarContext";
import Profile from "./Profile";
import Analytics from "./Analytics";
import ErrorPage from "./ErrorPage";
import OrderHistory from "./OrderHistory";
import AllOrders from './AllOrders'

export default function Dashboard() {
    const { sidebarOpen } = useContext(SidebarContext)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 sidebar">
                    <Sidebar />
                </div>
                <div className={`col-lg-10 container-fluid div-2 ${sidebarOpen ? 'sidebaropen' : 'sidebarclose'}`}>
                    <Routes>
                        <Route path="/" element={<Menu />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/orders/handling" element={<Orders />} />
                        <Route path="/orders/history" element={<OrderHistory />} />
                        <Route path="/orders/allorders" element={<AllOrders />} />
                        <Route path="/outlet/edit" element={<Outletdetails/>} />
                        <Route path="/editcategory/:id" element={<EditCategory />} />
                        <Route path="/outletdetails" element={<Outletdetails/>}/>
                        <Route path="/addcategory" element={<EditCategory />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path='*' element={<ErrorPage />}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}