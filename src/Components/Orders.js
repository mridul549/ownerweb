import React from "react";
import '../css/orders.css'

export default function Orders() {
    return (
        <div>
            <div className="orderContainer container-fluid d-flex justify-content-center align-items-center">
                <div className="orderPartition shadow-sm col-md-4 d-flex justify-content-center">
                    <div>
                        <h3 className="orderHeading">Pending Confimation</h3>
                        <div className="d-flex flex-column justify-content-center"></div>
                    </div>

                </div>
                <div className="orderPartition shadow-sm col-md-4 d-flex justify-content-center">
                    <div>
                        <h3 className="orderHeading">Active Orders</h3>
                        <div className="d-flex flex-column justify-content-center"></div>
                    </div>

                </div>
                <div className="orderPartition shadow-sm col-md-4 d-flex justify-content-center">
                    <div>
                        <h3 className="orderHeading">Ready for delivery</h3>
                    </div>

                </div>
            </div>
        </div>
    );
}
