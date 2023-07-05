import React from "react";
import "../css/outletdetails.css";

export default function Outletdetails() {
    return (
        <>
            <div className="first-div">
                <h1 className="form-heading">Add Outlet</h1>
            </div>
            <form>
                <div className="mb-3">
                    <label for="outletName" className="form-label main-label">
                        Outlet Name
                    </label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label for="address" className="form-label main-label">
                        Address
                    </label>
                    <div className="mb-3 row">
                        <label
                            for="addressline1"
                            className="col-sm-2 col-form-label"
                        >
                            Address Line 1
                        </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label
                            for="addressline2"
                            className="col-sm-2 col-form-label"
                        >
                            Address Line 2
                        </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="City" className="col-sm-2 col-form-label">
                            City
                        </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="Pincode" className="col-sm-2 col-form-label">
                            Pincode
                        </label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="state" className="col-sm-2 col-form-label">
                            State
                        </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="country" className="col-sm-2 col-form-label">
                            Country
                        </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label for="address" className="form-label main-label">
                        Timings
                    </label>
                    <div className="mb-3 row">
                        <div className="col-lg-2">
                            <label for="monday" className="col-sm-2 col-form-label">
                                Monday
                            </label>
                        </div>
                        <div className="input-group col-lg-10">
                            <input type="time" className="form-control" />

                            <input type="time" className="form-control" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="Tuesday" className="col-sm-2 col-form-label">
                            Tuesday
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">opening time</span>
                            <input type="time" className="form-control" />
                            <span className="input-group-text">closing time</span>
                            <input type="time" className="form-control" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="Wednesday" className="col-sm-2 col-form-label">
                            Wednesday
                        </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="Thursday" className="col-sm-2 col-form-label">
                            Thursday
                        </label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="Friday" className="col-sm-2 col-form-label">
                            Friday
                        </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="Saturday" className="col-sm-2 col-form-label">
                            Saturday
                        </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="Sunday" className="col-sm-2 col-form-label">
                            Sunday
                        </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label for="outletName" className="form-label main-label">
                        Days Open
                    </label>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
}
