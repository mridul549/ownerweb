import React from "react";
import MenuItem from "./MenuItem";
import Category from "./Category";
import "../css/menu.css";

export default function Menu() {
    return (
        <div className="container-fluid my-5" style={{ padding: 0, margin: 0, maxWidth: "100%" }}>
            <h2 className="categoryHead my-5">Categories </h2>
            <div className="container categoryContainer">
                <div className="categoryScroll">
                    <div className="categoryButton"></div>
                    <Category />    
                    <Category />    
                    <Category />    
                    <Category />    
                    <Category />    
                    <Category />    
                    <Category />    
                    <Category />    
                    <Category />    
                    <Category />    
                    <Category />    
                    <Category />    
                    <Category />    
                    <Category />    
                    <Category />    
                    <Category />    
                </div>
            </div>
            <div className="categoryName d-flex flex-row justify-content-start align-items-center">
                <h2 className="categoryHead my-5">All </h2>
                <i className="fa-sharp fa-solid fa-pen icon editIcon fa-lg"></i>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <MenuItem />
                </div>
                <div className="col-lg-6">
                    <MenuItem />
                </div>
                <div className="col-lg-6">
                    <MenuItem />
                </div>
                <div className="col-lg-6">
                    <MenuItem />
                </div>
                <div className="col-lg-6">
                    <MenuItem />
                </div>
                <div className="col-lg-6">
                    <MenuItem />
                </div>
                <div className="col-lg-6">
                    <MenuItem />
                </div>
                <div className="col-lg-6">
                    <MenuItem />
                </div>
                <div className="col-lg-6">
                    <MenuItem />
                </div>
                <div className="col-lg-6">
                    <MenuItem />
                </div>
            </div>
        </div>
    );
}
