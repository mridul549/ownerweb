import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AddOutlet from "./AddOutlet";
import SidebarContext from "../context/sidebar/sidebarContext";
import "../css/navbar.css";

export default function Navbar() {
    const { sidebarOpen, setSidebarOpen} = useContext(SidebarContext)

    const handleSidebarOps = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary">
                <div className="container-fluid d-flex justify-content-between">
                    <div>
                        <button className="btn" onClick={handleSidebarOps}><i class="fa-solid fa-xmark fa-2xl mx-3" style={{color: "#fff"}}></i></button>
                    </div>
                    <div>
                        <Link className="navbar-brand" to="#">
                            FlavR
                        </Link>
                    </div>
                    <div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                            <button type="button" className="btn outlet-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Outlets <i className="fa-solid fa-caret-down mx-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-seting">
                    <div className="modal-content ">
                        <div className="modal-body">
                            <AddOutlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
