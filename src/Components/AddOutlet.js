import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/addoutlet.css";
import OutletInfo from "./OutletInfo";

export default function AddOutlet() {
    const [outletArray, setOutletArray] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://flavr.tech/owner/getOutlets", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            const json = await response.json();
            setOutletArray(json.outlets);
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between mt-3 p-0 header-sec">
                <p className="p-margin"></p>
                <h2 className="modal-title modal-head" id="exampleModalLabel">
                    Select Outlet
                </h2>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div className="outer-div d-flex flex-column align-items-center justify-content-center">
                <Link to="/dashboard/outletdetails">
                    <button
                        className="btn add-new"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    >
                        Add New Outlet
                    </button>
                </Link>
                <div className="inner-div">
                    {outletArray.map((outlet) => {
                        return (
                            <div key={outlet._id}>
                                <OutletInfo
                                    image={outlet.outletImage?.url}
                                    head={outlet.outletName}
                                    address={outlet.address}
                                    id={outlet._id}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
