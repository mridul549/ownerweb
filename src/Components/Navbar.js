import { React, useState } from "react";
import { Link } from "react-router-dom";
import AddOutlet from "./AddOutlet";
import "../css/navbar.css";

export default function Navbar() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
           FlavR
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active home" aria-current="page" to="#">
                  Home
                </Link>
              </li>
              </ul>
              <button
                type="button"
                className="btn outlet-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Outlets
              </button>
          </div>
        </div>
      </nav>
      <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-scrollable modal-seting">
                  <div className="modal-content ">
                    <div className="modal-body">
                        <AddOutlet/>
                    </div>
                  </div>
                </div>
              </div>
    </>
  );
}
