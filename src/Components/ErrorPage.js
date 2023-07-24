import React from "react";
import "../css/errorPage.css";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (

        <div className="page_404 d-flex justify-content-center">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center ">404 Error</h1>
                            </div>

                            <div className="contant_box_404">
                                <h3 className="h2">Look like you're lost</h3>

                                <p>
                                    The page you are looking for is not avaible!
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
