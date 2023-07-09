import React, { useState } from "react";
import "../css/outletdetails.css";

export default function Outletdetails() {
    const [days, setdays] = useState([]);

    const [formstate, setformstate] = useState({
        outletname: "",
        addressline1: "",
        city: "",
        pincode: 0,
        state: "",
        country: "",
        monopen: "",
        monclose: "",
        tueopen: "",
        tueclose: "",
        wedopen: "",
        wedclose: "",
        thuropen: "",
        thurclose: "",
        friopen: "",
        friclose: "",
        satopen: "",
        satclose: "",
        sunopen: "",
        sunclose: "",
    });

    const onsubmit = () => {
        const address = {
            addressLine1: formstate.addressline1,
            city: formstate.city,
            state: formstate.state,
            zipCode: formstate.pincode,
            country: formstate.country,
        };

        let daysopen = {
            daysOpen: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
            },
        };
        for (let i = 0; i < days.length; i++) {
            daysopen.daysOpen[days[i].day] = true;
        }
        console.log(daysopen);
    };

    const onchange = (e) => {
        if (e.target.name === "mondayopen" || e.target.name === "mondayclose") {
            console.log(e.target.value);
            console.log(typeof e.target.value);
        }
        setformstate({ ...formstate, [e.target.name]: [e.target.value] });
    };

    const checkboxOnChange = (event) => {
        const itemObtained = JSON.parse(event.target.value);

        if (event.target.checked) {
            setdays((prevSelectedItems) => [
                ...prevSelectedItems,
                itemObtained,
            ]);
        } else {
            setdays((prevSelectedItems) =>
                prevSelectedItems.filter(
                    (item) => item.day !== itemObtained.day
                )
            );
        }
        console.log(days);
    };

    return (
        <>
            <div className="outermost-div">
                <div className="first-div">
                    <h1 className="form-heading">Add Outlet</h1>
                </div>
                <form>
                    <div className="mb-3">
                        <label
                            for="outletName"
                            className="form-label main-label required"
                        >
                            Outlet Name
                        </label>
                        <input
                            type="text"
                            className="form-control shadow-sm outlet-input"
                            onChange={onchange}
                            name="outletname"
                            placeholder="Enter outlet name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label for="address" className="form-label main-label">
                            Address
                        </label>
                        <div className="mb-3 row">
                            <label
                                for="addressline1"
                                className="col-sm-2 col-form-label required"
                            >
                                Address Line 1
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control shadow-sm outlet-input"
                                    onChange={onchange}
                                    name="addressline1"
                                    placeholder="Enter Address Line 1"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label
                                for="City"
                                className="col-sm-2 col-form-label required"
                            >
                                City
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control shadow-sm outlet-input"
                                    onChange={onchange}
                                    name="city"
                                    placeholder="Enter City"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label
                                for="Pincode"
                                className="col-sm-2 col-form-label required"
                            >
                                Pincode
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="number"
                                    className="form-control shadow-sm outlet-input"
                                    onChange={onchange}
                                    name="pincode"
                                    placeholder="Enter Pincode"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label
                                for="state"
                                className="col-sm-2 col-form-label required"
                            >
                                State
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control shadow-sm outlet-input"
                                    onChange={onchange}
                                    name="state"
                                    placeholder="Enter State"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label
                                for="country"
                                className="col-sm-2 col-form-label required"
                            >
                                Country
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control shadow-sm outlet-input"
                                    onChange={onchange}
                                    name="country"
                                    placeholder="Enter Country"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="address" className="form-label main-label">
                            Timings
                        </label>
                        <div className="mb-3 row">
                            <label
                                for="Monday"
                                className="col-sm-2 col-form-label"
                            >
                                Monday
                            </label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    opening time
                                </span>
                                <input
                                    type="time"
                                    name="monopen"
                                    onChange={onchange}
                                    className="form-control shadow-sm outlet-input"
                                />
                                <span className="input-group-text">
                                    closing time
                                </span>
                                <input
                                    type="time"
                                    name="monclose"
                                    onChange={onchange}
                                    className="form-control shadow-sm outlet-input"
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label
                                for="Tuesday"
                                className="col-sm-2 col-form-label"
                            >
                                Tuesday
                            </label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    opening time
                                </span>
                                <input
                                    type="time"
                                    onChange={onchange}
                                    name="tueopen"
                                    className="form-control shadow-sm outlet-input"
                                />
                                <span className="input-group-text">
                                    closing time
                                </span>
                                <input
                                    type="time"
                                    onChange={onchange}
                                    name="tueclose"
                                    className="form-control shadow-sm outlet-input"
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label
                                for="Wednesday"
                                className="col-sm-2 col-form-label"
                            >
                                Wednesday
                            </label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    opening time
                                </span>
                                <input
                                    type="time"
                                    onChange={onchange}
                                    name="wedopen"
                                    className="form-control shadow-sm outlet-input"
                                />
                                <span className="input-group-text">
                                    closing time
                                </span>
                                <input
                                    type="time"
                                    onChange={onchange}
                                    name="wedclose"
                                    className="form-control shadow-sm outlet-input"
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label
                                for="Thursday"
                                className="col-sm-2 col-form-label"
                            >
                                Thursday
                            </label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    opening time
                                </span>
                                <input
                                    type="time"
                                    onChange={onchange}
                                    name="thuropen"
                                    className="form-control shadow-sm outlet-input"
                                />
                                <span className="input-group-text">
                                    closing time
                                </span>
                                <input
                                    type="time"
                                    onChange={onchange}
                                    name="thurclose"
                                    className="form-control shadow-sm outlet-input"
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label
                                for="Friday"
                                className="col-sm-2 col-form-label"
                            >
                                Friday
                            </label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    opening time
                                </span>
                                <input
                                    type="time"
                                    onChange={onchange}
                                    name="friopen"
                                    className="form-control shadow-sm outlet-input"
                                />
                                <span className="input-group-text">
                                    closing time
                                </span>
                                <input
                                    type="time"
                                    onChange={onchange}
                                    name="friclose"
                                    className="form-control shadow-sm outlet-input"
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label
                                for="Saturday"
                                className="col-sm-2 col-form-label"
                            >
                                Saturday
                            </label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    opening time
                                </span>
                                <input
                                    type="time"
                                    onChange={onchange}
                                    name="satopen"
                                    className="form-control shadow-sm outlet-input"
                                />
                                <span className="input-group-text">
                                    closing time
                                </span>
                                <input
                                    type="time"
                                    onChange={onchange}
                                    name="satclose"
                                    className="form-control shadow-sm outlet-input"
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label
                                for="Sunday"
                                className="col-sm-2 col-form-label"
                            >
                                Sunday
                            </label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    opening time
                                </span>
                                <input
                                    type="time"
                                    onChange={onchange}
                                    name="sunopen"
                                    className="form-control shadow-sm outlet-input"
                                />
                                <span className="input-group-text">
                                    closing time
                                </span>
                                <input
                                    type="time"
                                    onChange={onchange}
                                    name="sunclose"
                                    className="form-control shadow-sm outlet-input"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label
                            for="outletName"
                            className="form-label main-label"
                        >
                            Days Open
                        </label>
                        <div class="form-check">
                            <input
                                class="form-check-input "
                                onChange={checkboxOnChange}
                                name="monday"
                                value={JSON.stringify({ day: "monday" })}
                                type="checkbox"
                                id="flexCheckDefault"
                            />
                            <label
                                class="form-check-label"
                                for="flexCheckDefault"
                            >
                                Monday
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                class="form-check-input "
                                onChange={checkboxOnChange}
                                name="tuesday"
                                value={JSON.stringify({ day: "tuesday" })}
                                type="checkbox"
                                id="flexCheckDefault"
                            />
                            <label
                                class="form-check-label"
                                for="flexCheckDefault"
                            >
                                Tuesday
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                onChange={checkboxOnChange}
                                name="wednesday"
                                value={JSON.stringify({ day: "wednesday" })}
                                type="checkbox"
                                id="flexCheckDefault"
                            />
                            <label
                                class="form-check-label"
                                for="flexCheckDefault"
                            >
                                Wednesday
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                onChange={checkboxOnChange}
                                name="thursday"
                                value={JSON.stringify({ day: "thursday" })}
                                type="checkbox"
                                id="flexCheckDefault"
                            />
                            <label
                                class="form-check-label"
                                for="flexCheckDefault"
                            >
                                Thursday
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                onChange={checkboxOnChange}
                                name="friday"
                                value={JSON.stringify({ day: "friday" })}
                                type="checkbox"
                                id="flexCheckDefault"
                            />
                            <label
                                class="form-check-label"
                                for="flexCheckDefault"
                            >
                                Friday
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                onChange={checkboxOnChange}
                                name="saturday"
                                value={JSON.stringify({ day: "saturday" })}
                                type="checkbox"
                                id="flexCheckDefault"
                            />
                            <label
                                class="form-check-label"
                                for="flexCheckDefault"
                            >
                                Saturday
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                onChange={checkboxOnChange}
                                name="sunday"
                                value={JSON.stringify({ day: "sunday" })}
                                type="checkbox"
                                id="flexCheckDefault"
                            />
                            <label
                                class="form-check-label"
                                for="flexCheckDefault"
                            >
                                Sunday
                            </label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label
                            for="outletName"
                            className="form-label main-label"
                        >
                            Outlet Image
                        </label>
                        <input
                            className="form-control shadow-sm outlet-input"
                            type="file"
                            id="formFile"
                        ></input>
                    </div>
                    <div className="submit-div">
                        <button
                            type="submit"
                            onClick={onsubmit}
                            className="btn submit-btn"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
