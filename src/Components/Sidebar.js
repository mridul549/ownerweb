import React, { useState, useContext } from "react";
import "../css/sidebar.css";
import { Link } from "react-router-dom";
import SidebarContext from "../context/sidebar/sidebarContext";

export default function Sidebar() {
    const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext)

    const handleMenuBtnClick = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <div className={`sidebar shadow ${sidebarOpen ? "open" : ""}`}>
                <div className="logo-details">
                    <div className="logo_name mx-4 mt-4"><img src="https://res.cloudinary.com/dokgv4lff/image/upload/v1688365848/flavr_l4bspc.png" style={{width: "70px"}} alt="" /></div>
                    {/* <div className="logo_name mx-3">FlavR</div> */}
                    <i
                        className={`bx menuBtn mx-2 ${
                            sidebarOpen ? "bx-menu-alt-right" : "bx-menu"
                        }`}
                        id="btn"
                        onClick={handleMenuBtnClick}
                    ></i>
                </div>
                <ul className="nav-list">
                    <li>
                        <Link to="/dashboard/menu">
                            <i className='bx bx-food-menu' ></i>
                            <span className="links_name">Menu</span>
                        </Link>
                        <span className="tooltip">Menu</span>
                    </li>
                    <li>
                        <Link to="/dashboard/orders">
                            <i className="bx bx-cart-alt"></i>
                            <span className="links_name">Orders</span>
                        </Link>
                        <span className="tooltip">Orders</span>
                    </li>
                    <li>
                        <Link to="/dashboard/outlet">
                            <i className='bx bx-store-alt'></i>
                            <span className="links_name">Outlet</span>
                        </Link>
                        <span className="tooltip">Outlet</span>
                    </li>
                    <li className="profile">
                        <div className="profile-details">
                            <img src={localStorage.getItem('ownerProfilePic')} alt="profileImg" />
                            <div className="name_job">
                                <div className="name">{localStorage.getItem('ownerName')} </div>
                                <div className="job">Owner</div>
                            </div>
                        </div>
                        <i className="bx bx-log-out" id="log_out"></i>
                    </li>
                </ul>
            </div>
        </>
    );
}
