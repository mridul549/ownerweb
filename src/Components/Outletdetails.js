import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import "../css/outletdetails.css";

export default function Outletdetails() {
    const [days, setdays] = useState([]);
    const [image, setImage] = useState('')
    const inputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()

    const handleImageClick = () => {
        inputRef.current.click()
    }

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
        outletImage: null
    });


    const onsubmit = async(e) => {

        e.preventDefault();
        setLoading(true);
        const address = {
            addressLine1: formstate.addressline1[0],
            city: formstate.city[0],
            state: formstate.state[0],
            zipCode: formstate.pincode[0],
            country: formstate.country[0],
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
        
        let timings={
            monday:{
                open:formstate.monopen.length===1?formstate.monopen[0]:"",
                close:formstate.monclose.length===1?formstate.monclose[0]:""
            },
            tuesday:{
                open:formstate.tueopen.length===1?formstate.tueopen[0]:"",
                close:formstate.tueclose.length===1?formstate.tueclose[0]:""
            },
            wednesday:{
                open:formstate.wedopen.length===1?formstate.wedopen[0]:"",
                close:formstate.wedclose.length===1?formstate.wedclose[0]:""
            },
            thursday:{
                open:formstate.thuropen.length===1?formstate.thuropen[0]:"",
                close:formstate.thurclose.length===1?formstate.thurclose[0]:""
            },
            friday:{
                open:formstate.friopen.length===1?formstate.friopen[0]:"",
                close:formstate.friclose.length===1?formstate.friclose[0]:""
            },
            saturday:{
                open:formstate.satopen.length===1?formstate.satopen[0]:"",
                close:formstate.satclose.length===1?formstate.satclose[0]:""
            },
            sunday:{
                open:formstate.sunopen.length===1?formstate.sunopen[0]:"",
                close:formstate.sunclose.length===1?formstate.sunclose[0]:""
            }
        }
        const outletFormData = new FormData()
        outletFormData.append('outletName', formstate.outletname)
        outletFormData.append('address',JSON.stringify(address))
        outletFormData.append('timings',JSON.stringify(timings))
        outletFormData.append('daysOpen',JSON.stringify(daysopen))
        if(formstate.outletImage){
            outletFormData.append('outletImage',formstate.outletImage)
        } 
        const response = await fetch(`https://flavr.tech/outlet/addOutlet`, {
                method: "POST", 
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                },
                body: outletFormData
            })
            const json = await response.json()
            setLoading(false);
        if(json.message==="Outlet added successfully")
        {
            navigate('/dashboard/menu')
        }

    };

    const onchange = (e) => {
        if (e.target.name === "outletImageInput") {
            setImage(e.target.files[0])
            setformstate({ ...formstate, outletImage: e.target.files[0] });
        }
        else
        {
        setformstate({ ...formstate, [e.target.name]: [e.target.value] });
        }
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
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label main-label">
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
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label main-label">
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
                        <div className="productImage d-flex flex-column align-items-center justify-content-center" onClick={handleImageClick}>
                            <label htmlFor="outletImageInput">{image ? image.name : "Choose an image"} </label>
                            {image ? 
                                (typeof image === 'string' ? 
                                    <img className="mt-3" style={{width: "200px", height: "200px",borderRadius: "50%"}} src={image} alt="" /> : 
                                    <img className="mt-3" style={{width: "200px", height: "200px",borderRadius: "50%"}} src={URL.createObjectURL(image)} alt="" />
                                ) :
                                <img className="mt-3" style={{width: "200px", height: "200px"}} src="https://cdn-icons-png.flaticon.com/512/679/679845.png" alt="" />
                            }
                            <input type="file" name="outletImageInput" ref={inputRef} onChange={onchange} className="productPicInput d-flex justify-content-center"/>
                        </div>
                    </div>
                    <div className="submit-div">
                    {loading && <Spinner />}
                        <button
                            type="submit"
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
