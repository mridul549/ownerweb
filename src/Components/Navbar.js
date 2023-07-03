import { React, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddOutlet from "./AddOutlet";
import "../css/navbar.css";
import SidebarContext from "../context/sidebar/sidebarContext";

export default function Navbar() {
    const [modal, setModal] = useState(false);
    const [greetingMsg, setGreetingMsg] = useState('')
    const { sidebarOpen } = useContext(SidebarContext)

    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            setGreetingMsg("Good Morning!");
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreetingMsg("Good Afternoon!");
        } else {
            setGreetingMsg("Good Evening!");
        }
    }, [])

    return (
        <>
            <nav className={`navbar glassElement navbar-expand-lg fixed-top bg-body-tertiary mt-2 ${!sidebarOpen ? 'navbarclose' : 'navbaropen'}`}>
                <div className="container-fluid">
                    <div className="greeting">
                        <h5 style={{color: '#027450'}}>{greetingMsg}</h5>
                        <h3 style={{color: '#004932', fontSize: '25px'}}>{localStorage.getItem('ownerName')} Verma</h3>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">   
                            <img src="https://res.cloudinary.com/dokgv4lff/image/upload/v1688365848/flavr_l4bspc.png" style={{width: "100px"}} alt="" />
                        </div>
                    </div>
                    <div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                            <button type="button" className="btn outlet-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Nescafe NITJ <i className="fa-solid fa-caret-down mx-1"></i>
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
