import React, { useState, useContext } from "react";
import "../css/sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import SidebarContext from "../context/sidebar/sidebarContext";

export default function Sidebar() {
    const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext)

    const navigate = useNavigate()
    const handleOwnerProfile = () => {
        navigate('/dashboard/profile')
    }

    const handleMenuBtnClick = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const handleSignOut = () => {
        localStorage.clear()
        navigate('/')
    }

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
                        <Link to="/dashboard/analytics">
                            <i className='bx bx-line-chart'></i>
                            <span className="links_name">Analytics</span>
                        </Link>
                        <span className="tooltip">Analytics</span>
                    </li>
                    <li>
                        <Link to="/dashboard/outlet/edit">
                            <i className='bx bx-store-alt'></i>
                            <span className="links_name">Outlet</span>
                        </Link>
                        <span className="tooltip">Outlet</span>
                    </li>
                    <li className="profile">
                        <div className="profile-details">
                            <div onClick={handleOwnerProfile} style={{cursor: "pointer"}}>
                                <img src={localStorage.getItem('ownerProfilePic')!=="null" ? localStorage.getItem('ownerProfilePic') : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="profileImg" />
                            </div>
                            <div className="name_job">
                                <div className="name">{localStorage.getItem('ownerName').substring(0,15)} </div>
                                <div className="job">Owner</div>
                            </div>
                        </div>
                        <button className="btn" onClick={handleSignOut} ><i className="bx bx-log-out" id="log_out"></i></button> 
                        <span className="tooltip">Outlet</span>
                    </li>
                </ul>
            </div>
        </>
    );
}
