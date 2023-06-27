import React from "react";
import MenuItem from "./MenuItem";
import Category from "./Category";
import "../css/menu.css";

export default function Menu() {
    
    return (
        <div className="container-fluid my-5 main-div" style={{ padding: 0, margin: 0 }}>
            <div className="d-flex flex-row justify-content-start align-items-center">
                <h2 className="categoryHead my-5">Categories </h2>
                <i class="fa-solid fa-circle-plus fa-2xl plus" style={{color: "#004932"}} ></i>
            </div>
            <div className="col container categoryContainer">
                <div className="categoryScroll">
                    <div className="categoryButton"><Category /></div>
                    <div className="categoryButton"><Category /></div>
                    <div className="categoryButton"><Category /></div>
                    <div className="categoryButton"><Category /></div>
                    <div className="categoryButton"><Category /></div>
                    <div className="categoryButton"><Category /></div>
                    <div className="categoryButton"><Category /></div>
                    <div className="categoryButton"><Category /></div>
                    <div className="categoryButton"><Category /></div>
                    <div className="categoryButton"><Category /></div>
                    <div className="categoryButton"><Category /></div>
                    <div className="categoryButton"><Category /></div>
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