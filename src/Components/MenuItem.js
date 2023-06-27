import React from "react";
import "../css/menuitem.css";

export default function MenuItem() {
    const handleEdit = () => {
        console.log("edit");
    }

    return (
        <div className="card mb-3 shadow-sm" style={{maxWidth: "500px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="https://i.imgur.com/CkwB6CY.jpg" style={{height: "100%", width: "100%", margin: 0}} className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title"> Original Masala Maggi</h5>
                        <p className="card-text" style={{fontWeight: 600, fontSize: "20px", marginBottom: 0}}>₹ 45</p>
                        <p className="card-text" style={{color: "grey", fontWeight: "500",textAlign: 'justify', fontSize: "14px"}}>This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>
                <div className="col-md-1">
                    <img src="https://i.imgur.com/qFC9XwF.png" style={{width: "25px", height: '25px', display: 'inline-flex'}} alt=""/>
                    <i className="fa-sharp fa-solid fa-pen icon fa-lg" style={{width: "25px", height: '25px'}} onClick={handleEdit}></i>
                </div>
            </div>
        </div>
    );
}