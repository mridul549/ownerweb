import React from "react";
import "../css/outletdetails.css";

export default function Outletdetails() {
    return (
        <>
            <div className="first-div">
                <h1 className="form-heading">Add Outlet</h1>
            </div>
            <form>
                <div class="mb-3">
                    <label for="outletName" class="form-label main-label">
                        Outlet Name
                    </label>
                    <input type="text" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label main-label">
                        Address
                    </label>
                    <div class="mb-3 row">
                        <label
                            for="addressline1"
                            class="col-sm-2 col-form-label"
                        >
                            Address Line 1
                        </label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label
                            for="addressline2"
                            class="col-sm-2 col-form-label"
                        >
                            Address Line 2
                        </label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="City" class="col-sm-2 col-form-label">
                            City
                        </label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="Pincode" class="col-sm-2 col-form-label">
                            Pincode
                        </label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="state" class="col-sm-2 col-form-label">
                            State
                        </label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="country" class="col-sm-2 col-form-label">
                            Country
                        </label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" />
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label main-label">
                        Timings
                    </label>
                    <div class="mb-3 row">
                        <div className="col-lg-2">
                            <label for="monday" class="col-sm-2 col-form-label">
                                Monday
                            </label>
                        </div>
                        <div class="input-group col-lg-10">
                            <input type="time" class="form-control" />

                            <input type="time" class="form-control" />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="Tuesday" class="col-sm-2 col-form-label">
                            Tuesday
                        </label>
                        <div class="input-group">
                            <span class="input-group-text">opening time</span>
                            <input type="time" class="form-control" />
                            <span class="input-group-text">closing time</span>
                            <input type="time" class="form-control" />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="Wednesday" class="col-sm-2 col-form-label">
                            Wednesday
                        </label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="Thursday" class="col-sm-2 col-form-label">
                            Thursday
                        </label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="Friday" class="col-sm-2 col-form-label">
                            Friday
                        </label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="Saturday" class="col-sm-2 col-form-label">
                            Saturday
                        </label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="Sunday" class="col-sm-2 col-form-label">
                            Sunday
                        </label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" />
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="outletName" class="form-label main-label">
                        Days Open
                    </label>
                </div>

                <button type="submit" class="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
}
