import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import "../css/outletdetails.css";
import OutletContext from "../context/outlet/outletContext";
import { useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imageoutlet from "../images/Res3D.png";
import Otp from "../Components/Otp";
import AuthContext from "../context/auth/authContext";

export default function Outletdetails() {
    const [days, setdays] = useState([]);
    const [image, setImage] = useState("");
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState({
        state: false,
    });
    const [isModalState, setIsModalState] = useState({
        state: false,
    });
    const [notselected, setNotSelected] = useState(false);
    const { setEmail, setOtpFor } = useContext(AuthContext);

    const location = useLocation();
    const [checkBoxState, setCheckBoxState] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    });
    const { formstate, setformstate } = useContext(OutletContext);
    const [title, setTitle] = useState("");

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const onsubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const address = {
            addressLine1: formstate.addressline1,
            city: formstate.city,
            state: formstate.state,
            zipCode: formstate.pincode,
            country: formstate.country,
        };
        console.log(address);
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

        let timings = {
            monday: {
                open: formstate.monopen,
                close: formstate.monclose,
            },
            tuesday: {
                open: formstate.tueopen,
                close: formstate.tueclose,
            },
            wednesday: {
                open: formstate.wedopen,
                close: formstate.wedclose,
            },
            thursday: {
                open: formstate.thuropen,
                close: formstate.thurclose,
            },
            friday: {
                open: formstate.friopen,
                close: formstate.friclose,
            },
            saturday: {
                open: formstate.satopen,
                close: formstate.satclose,
            },
            sunday: {
                open: formstate.sunopen,
                close: formstate.sunclose,
            },
        };
        console.log(JSON.stringify(address));
        const outletFormData = new FormData();
        outletFormData.append("outletName", formstate.outletname);
        outletFormData.append("address", JSON.stringify(address));
        outletFormData.append("timings", JSON.stringify(timings));
        outletFormData.append("daysOpen", JSON.stringify(daysopen));
        if (formstate.outletImage) {
            outletFormData.append("outletImage", formstate.outletImage);
        }

        const entries = outletFormData.entries();

        // Iterate over the entries
        for (let entry of entries) {
            const [key, value] = entry;
            console.log(`Key: ${key}, Value: ${value}`);
        }
        if (location.pathname === "/dashboard/outlet/edit") {
            const response = await fetch(
                `https://flavr.tech/outlet/updateOutlet/${localStorage.getItem(
                    "selectedOutlet"
                )}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                    body: outletFormData,
                }
            );
            const json = await response.json();
            setLoading(false);
            if (json.message === "Outlet updated successfully") {
                toast.success(json.message, {
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        } else {
            const response = await fetch(
                `https://flavr.tech/outlet/addOutlet`,
                {
                    method: "POST",
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                    body: outletFormData,
                }
            );
            const json = await response.json();
            setLoading(false);
            if (json.message === "Outlet added successfully") {
                navigate("/dashboard/menu");
            }
        }
    };

    function convert(timeString) {
        console.log(timeString);
        const [time, period] = timeString.split(" ");
        const [hours, minutes] = time.split(":");

        let convertedHours = parseInt(hours);

        if (period === "PM" && convertedHours !== 12) {
            convertedHours += 12;
        } else if (period === "AM" && convertedHours === 12) {
            convertedHours = 0;
        }

        const convertedTimeString = `${String(convertedHours).padStart(
            2,
            "0"
        )}:${minutes}`;

        return convertedTimeString;
    }

    const onchange = (e) => {
        if (e.target.name === "outletImageInput") {
            setImage(e.target.files[0]);
            setformstate({ ...formstate, outletImage: e.target.files[0] });
        } else {
            setformstate({ ...formstate, [e.target.name]: e.target.value });
        }
    };

    const checkboxOnChange = (event) => {
        const itemObtained = JSON.parse(event.target.value);
        setCheckBoxState({
            ...checkBoxState,
            [itemObtained.day]: !checkBoxState[itemObtained.day],
        });
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

    useEffect(() => {
        console.log(location);
        const fetchdata = async () => {
            if (location.pathname === "/dashboard/outlet/edit") {
                if (
                    localStorage.getItem("selectedOutlet") === "" ||
                    localStorage.getItem("selectedOutlet") === undefined ||
                    localStorage.getItem("selectedOutlet") === null
                ) {
                    setNotSelected(true);
                    return;
                }
                setTitle("Update Outlet");
                const response = await fetch(
                    `https://flavr.tech/outlet/getOutlet?outletid=${localStorage.getItem(
                        "selectedOutlet"
                    )}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                const json = await response.json();
                console.log(json.result[0]);
                const res = json.result[0];
                setformstate({
                    ...formstate,
                    outletname: res.outletName,
                    addressline1: res.address.addressLine1,
                    city: res.address.city,
                    pincode: res.address.zipCode,
                    state: res.address.state,
                    country: res.address.country,
                    monopen: res.timings.monday.open,
                    monclose: res.timings.monday.close,
                    tueopen: res.timings.tuesday.open,
                    tueclose: res.timings.tuesday.close,
                    wedopen: res.timings.wednesday.open,
                    wedclose: res.timings.wednesday.close,
                    thuropen: res.timings.thursday.open,
                    thurclose: res.timings.thursday.close,
                    friopen: res.timings.friday.open,
                    friclose: res.timings.friday.close,
                    satopen: res.timings.saturday.open,
                    satclose: res.timings.saturday.close,
                    sunopen: res.timings.sunday.open,
                    sunclose: res.timings.sunday.close,
                });
                console.log(res.daysOpen);
                setCheckBoxState({
                    monday: res.daysOpen.monday,
                    tuesday: res.daysOpen.tuesday,
                    wednesday: res.daysOpen.wednesday,
                    thursday: res.daysOpen.thursday,
                    friday: res.daysOpen.friday,
                    saturday: res.daysOpen.saturday,
                    sunday: res.daysOpen.sunday,
                });
                let array = [];
                const allDays = [
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                    "sunday",
                ];
                for (let i = 0; i < allDays.length; i++) {
                    const element = allDays[i];
                    if (res.daysOpen[element]) {
                        const object = { day: element };
                        array.push(object);
                    }
                }
                setdays(array);
                setImage(res.outletImage.url);
            } else {
                setTitle("Add Outlet");
                setformstate({
                    outletname: "",
                    addressline1: "",
                    city: "",
                    pincode: "",
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
                    outletImage: null,
                });
                setdays([]);
            }
        };
        fetchdata();
    }, [location]);

    const handleCloseConfirmModal = () => {
        setIsConfirmModalOpen({ state: false });
    };

    const handleDeleteModal = () => {
        setIsConfirmModalOpen({ state: true });
    };

    const handleSecondModal = () => {
        setIsModalState({ state: true });
    };

    const handleCloseModal = () => {
        setIsModalState({ state: false });
    };

    const handleyes = () => {
        handleCloseConfirmModal();
        handleVerifyEmail();
        handleSecondModal();
    };

    const handleVerifyEmail = async () => {
        setOtpFor("delete");

        toast.promise(
            fetch(`https://flavr.tech/mail/resendotp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    key: localStorage.getItem("ownerEmail"),
                    role: 1,
                }),
            }).then((response) => response.json()),
            {
                pending: {
                    render() {
                        return `Sending OTP to ${localStorage.getItem(
                            "ownerEmail"
                        )}...`;
                    },
                    icon: true,
                },
                success: {
                    render({ data }) {
                        setEmail(localStorage.getItem("ownerEmail"));
                        //  setEmailVerifiedModal({...emailVerifiedModal, state: true})
                        return data.message;
                    },
                },
                error: {
                    render({ data }) {
                        return "Internal server error";
                    },
                },
            }
        );
    };

    const afterVerify = () => {
        toast.promise(
            fetch(`https://flavr.tech/outlet/deleteOutlet`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    outletid: localStorage.getItem("selectedOutlet"),
                }),
            }).then((response) => response.json()),
            {
                pending: {
                    render() {
                        return `Please wait...`;
                    },
                    icon: true,
                },
                success: {
                    render({ data }) {
                        localStorage.setItem("selectedOutlet", "");
                        handleCloseModal();
                        localStorage.setItem("selectedOutletName", "");
                        setTimeout(navigate("/dashboard/menu"), 2000);
                        return data.message;
                    },
                },
                error: {
                    render({ data }) {
                        return "Internal server error";
                    },
                },
            }
        );
    };

    return (
        <>
            <Modal
                show={isConfirmModalOpen.state}
                onHide={handleCloseConfirmModal}
            >
                <Modal.Header className="d-flex justify-content-center">
                    <Modal.Title style={{ textAlign: "center" }}>
                        Delete Outlet
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer className="d-flex justify-content-center">
                    <p>Are you sure you want to delete outlet?</p>
                    <div className="row mt-3 d-flex justify-content-center">
                        <div className="col-lg-6">
                            <Button
                                className=""
                                variant="secondary"
                                onClick={handleCloseConfirmModal}
                            >
                                No
                            </Button>
                        </div>
                        <div className="col-lg-6">
                            <Button
                                variant="btn"
                                className="yesBtn"
                                onClick={handleyes}
                            >
                                Yes
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal show={isModalState.state} onHide={handleCloseModal}>
                <Modal.Header className="d-flex justify-content-center">
                    <Modal.Title style={{ textAlign: "center" }}>
                        Delete Outlet
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <div>
                        <div
                            style={{ marginTop: "-60px", marginBottom: "10px" }}
                        >
                            <Otp afterVerify={afterVerify} />
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

            {!notselected ? (
                <div className="outermost-div">
                    <div className="first-div">
                        <h1 className="form-heading">{title}</h1>
                    </div>
                    <form onSubmit={onsubmit}>
                        <div className="mb-3">
                            <label
                                htmlFor="outletName"
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
                                value={formstate.outletname}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="address"
                                className="form-label main-label"
                            >
                                Address
                            </label>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="addressline1"
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
                                        value={formstate.addressline1}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="City"
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
                                        value={formstate.city}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="Pincode"
                                    className="col-sm-2 col-form-label required"
                                >
                                    Pincode
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control shadow-sm outlet-input"
                                        onChange={onchange}
                                        name="pincode"
                                        placeholder="Enter Pincode"
                                        value={formstate.pincode}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="state"
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
                                        value={formstate.state}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="country"
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
                                        value={formstate.country}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="address"
                                className="form-label main-label"
                            >
                                Timings
                            </label>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="Monday"
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
                                        value={convert(formstate.monopen)}
                                    />
                                    <span className="input-group-text">
                                        closing time
                                    </span>
                                    <input
                                        type="time"
                                        name="monclose"
                                        onChange={onchange}
                                        className="form-control shadow-sm outlet-input"
                                        value={convert(formstate.monclose)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="Tuesday"
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
                                        value={convert(formstate.tueopen)}
                                    />
                                    <span className="input-group-text">
                                        closing time
                                    </span>
                                    <input
                                        type="time"
                                        onChange={onchange}
                                        name="tueclose"
                                        className="form-control shadow-sm outlet-input"
                                        value={convert(formstate.tueclose)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="Wednesday"
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
                                        value={convert(formstate.wedopen)}
                                    />
                                    <span className="input-group-text">
                                        closing time
                                    </span>
                                    <input
                                        type="time"
                                        onChange={onchange}
                                        name="wedclose"
                                        className="form-control shadow-sm outlet-input"
                                        value={convert(formstate.wedclose)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="Thursday"
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
                                        value={convert(formstate.thuropen)}
                                    />
                                    <span className="input-group-text">
                                        closing time
                                    </span>
                                    <input
                                        type="time"
                                        onChange={onchange}
                                        name="thurclose"
                                        className="form-control shadow-sm outlet-input"
                                        value={convert(formstate.thurclose)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="Friday"
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
                                        value={convert(formstate.friopen)}
                                    />
                                    <span className="input-group-text">
                                        closing time
                                    </span>
                                    <input
                                        type="time"
                                        onChange={onchange}
                                        name="friclose"
                                        className="form-control shadow-sm outlet-input"
                                        value={convert(formstate.friclose)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="Saturday"
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
                                        value={convert(formstate.satopen)}
                                    />
                                    <span className="input-group-text">
                                        closing time
                                    </span>
                                    <input
                                        type="time"
                                        onChange={onchange}
                                        name="satclose"
                                        className="form-control shadow-sm outlet-input"
                                        value={convert(formstate.satclose)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label
                                    htmlFor="Sunday"
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
                                        value={convert(formstate.sunopen)}
                                    />
                                    <span className="input-group-text">
                                        closing time
                                    </span>
                                    <input
                                        type="time"
                                        onChange={onchange}
                                        name="sunclose"
                                        className="form-control shadow-sm outlet-input"
                                        value={convert(formstate.sunclose)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="outletName"
                                className="form-label main-label"
                            >
                                Days Open
                            </label>
                            <div className="form-check">
                                <input
                                    className="form-check-input "
                                    onChange={checkboxOnChange}
                                    name="monday"
                                    value={JSON.stringify({ day: "monday" })}
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    checked={checkBoxState.monday}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault"
                                >
                                    Monday
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input "
                                    onChange={checkboxOnChange}
                                    name="tuesday"
                                    value={JSON.stringify({ day: "tuesday" })}
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    checked={checkBoxState.tuesday}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault"
                                >
                                    Tuesday
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    onChange={checkboxOnChange}
                                    name="wednesday"
                                    value={JSON.stringify({ day: "wednesday" })}
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    checked={checkBoxState.wednesday}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault"
                                >
                                    Wednesday
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    onChange={checkboxOnChange}
                                    name="thursday"
                                    value={JSON.stringify({ day: "thursday" })}
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    checked={checkBoxState.thursday}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault"
                                >
                                    Thursday
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    onChange={checkboxOnChange}
                                    name="friday"
                                    value={JSON.stringify({ day: "friday" })}
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    checked={checkBoxState.friday}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault"
                                >
                                    Friday
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    onChange={checkboxOnChange}
                                    name="saturday"
                                    value={JSON.stringify({ day: "saturday" })}
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    checked={checkBoxState.saturday}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault"
                                >
                                    Saturday
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    onChange={checkboxOnChange}
                                    name="sunday"
                                    value={JSON.stringify({ day: "sunday" })}
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    checked={checkBoxState.sunday}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault"
                                >
                                    Sunday
                                </label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div
                                className="productImage d-flex flex-column align-items-center justify-content-center"
                                onClick={handleImageClick}
                            >
                                <label htmlFor="outletImageInput">
                                    {image ? image.name : "Choose an image"}{" "}
                                </label>
                                {image ? (
                                    typeof image === "string" ? (
                                        image!=="null" ?
                                        <img
                                            className="mt-3"
                                            style={{
                                                width: "400px",
                                                height: "200px",
                                                borderRadius: "10px",
                                            }}
                                            src={image}
                                            alt=""
                                        /> :
                                        <img
                                            className="mt-3"
                                            style={{
                                                width: "400px",
                                                height: "200px",
                                                borderRadius: "10px",
                                            }}
                                            src="https://res.cloudinary.com/dokgv4lff/image/upload/v1688220885/no_image_frvfpb.jpg"
                                            alt=""
                                        /> 
                                    ) : (
                                        <img
                                            className="mt-3"
                                            style={{
                                                width: "400px",
                                                height: "200px",
                                                borderRadius: "10px",
                                            }}
                                            src={URL.createObjectURL(image)}
                                            alt=""
                                        />
                                    )
                                ) : (
                                    <img
                                        className="mt-3"
                                        style={{
                                            width: "400px",
                                            height: "200px",
                                        }}
                                        src="https://cdn-icons-png.flaticon.com/512/679/679845.png"
                                        alt=""
                                    />
                                )}
                                <input
                                    type="file"
                                    name="outletImageInput"
                                    ref={inputRef}
                                    onChange={onchange}
                                    className="productPicInput d-flex justify-content-center"
                                />
                            </div>
                        </div>
                        <div className="submit-div">
                            {loading && <Spinner />}
                            <button type="submit" className="btn submit-btn">
                                Submit
                            </button>
                        </div>
                    </form>
                    <div className="delete-div">
                        <div className="d-flex justify-content-between">
                            <div className="col delete-txt-div">
                                <h5 className="delete-txt">Delete Outlet</h5>
                            </div>
                            <div className="col delete-btn-div">
                                <button
                                    className="btn delete-btn"
                                    onClick={handleDeleteModal}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container-fluid no-outlet mt-5">
                    <h1 className="no-outlet-text">No outlet selected</h1>
                    <img src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iibO6At5fPqo/v0/-999x-999.gif" alt="" className="img-outlet"></img>
                </div>
            )}
        </>
    );
}
