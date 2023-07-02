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
            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="logo-details">
                    <i className="bx bxl-c-plus-plus icon"></i>
                    <div className="logo_name">CodingLab</div>
                    <i
                        className={`bx ${
                            sidebarOpen ? "bx-menu-alt-right" : "bx-menu"
                        }`}
                        id="btn"
                        onClick={handleMenuBtnClick}
                    ></i>
                </div>
                <ul className="nav-list">
                    <li>
                        <a href="#">
                            <i className="bx bx-grid-alt"></i>
                            <span className="links_name">Dashboard</span>
                        </a>
                        <span className="tooltip">Dashboard</span>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bx bx-user"></i>
                            <span className="links_name">User</span>
                        </a>
                        <span className="tooltip">User</span>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bx bx-chat"></i>
                            <span className="links_name">Messages</span>
                        </a>
                        <span className="tooltip">Messages</span>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bx bx-pie-chart-alt-2"></i>
                            <span className="links_name">Analytics</span>
                        </a>
                        <span className="tooltip">Analytics</span>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bx bx-folder"></i>
                            <span className="links_name">File Manager</span>
                        </a>
                        <span className="tooltip">Files</span>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bx bx-cart-alt"></i>
                            <span className="links_name">Order</span>
                        </a>
                        <span className="tooltip">Order</span>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bx bx-heart"></i>
                            <span className="links_name">Saved</span>
                        </a>
                        <span className="tooltip">Saved</span>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bx bx-cog"></i>
                            <span className="links_name">Setting</span>
                        </a>
                        <span className="tooltip">Setting</span>
                    </li>
                    <li className="profile">
                        <div className="profile-details">
                            <img src="profile.jpg" alt="profileImg" />
                            <div className="name_job">
                                <div className="name">Prem Shahi</div>
                                <div className="job">Web designer</div>
                            </div>
                        </div>
                        <i className="bx bx-log-out" id="log_out"></i>
                    </li>
                </ul>
            </div>
        </>
    );
}
