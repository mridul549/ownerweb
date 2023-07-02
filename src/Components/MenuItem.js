import React, { useState } from "react";
import "../css/menuitem.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MenuItem(props) {

    const [variantToggle, setVariantToggle] = useState(false)
    const [isChecked, setIsChecked] = useState(props.instock)

    const handleVariantButtonClick = () => {
        setVariantToggle(!variantToggle)
    }

    const checkedToggle = async (e, productid) => {
        setIsChecked(!isChecked)

        // const response = await fetch("https://flavr.tech/products/instock", {
        //     method: "PATCH", 
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": "Bearer " + localStorage.getItem('token')
        //     },
        //     body: JSON.stringify({productid: productid, instock: !isChecked})
        // }) 
        // const json = await response.json()

        // toast.success(json.message, {
        //     closeOnClick: true,
        //     pauseOnHover: true,
        // })

        toast.promise(
            fetch("https://flavr.tech/products/instock", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    productid: productid,
                    instock: !isChecked,
                }),
            }).then((response) => response.json()),
            {
                pending: {
                    render() {
                        return "Please wait...";
                    },
                    icon: true,
                },
                success: {
                    render({ data }) {
                        return data.message;
                    },
                },
            }
        );
    }

    return (
        <>
        <div className="card mb-3 shadow-sm" style={{maxWidth: "500px"}}>
            <div className="topRow my-1 d-flex justify-content-between">
                <div className="switch mt-1">
                    <div className="form-check form-switch">
                        <input className="form-check-input inStock" onChange={(e) => checkedToggle(e, props.productid)} type="checkbox" checked={isChecked} key={props.productid} />
                        <label htmlFor="">Available</label>
                    </div>
                </div>
                {props.productEdit ?
                    <div className="editRow">
                        <i className="fa-sharp fa-solid fa-pen icon fa-lg mx-3 updel" onClick={() => props.onClick(0)} style={{width: "20px", height: '20px'}}></i>
                        <i className="fa-solid fa-trash fa-lg updel icon" onClick={() => props.onClick(1)} style={{width: "20px", height: '20px', color: "#ff0303"}}></i>
                    </div> : ''
                } 
            </div>
            <div className='row g-0 mainContent'>
                <div className="col-md-4">
                    <img src={props.productImage!=="null" ? props.productImage: "https://res.cloudinary.com/dokgv4lff/image/upload/v1688123548/Food_no_image_2_ob6aja.png"} style={{height: "100%", width: "100%", margin: 0}} className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title"> {props.productName}</h5>
                        <p className="card-text" style={{fontWeight: 600, fontSize: "20px", marginBottom: 0}}>₹ {props.productPrice}</p>
                        <p className="card-text" style={{color: "grey", fontWeight: "500",textAlign: 'justify', fontSize: "14px"}}>{props.description}</p>
                    </div>
                </div>
                <div className="col-md-1">
                    <img className="mt-2" src={props.veg ? "https://i.imgur.com/qFC9XwF.png" : "https://i.imgur.com/ttMff3E.png"} style={{width: "25px", height: '25px'}} alt=""/>
                </div>
            </div>
            {props.variants.length!==0 ?
                (<div className="variants my-2 mx-3">
                    <div className="variantBtn d-flex justify-content-center">
                        <button type="button" className="btn variantDropDownBtn shadow-sm" onClick={handleVariantButtonClick} >
                            {!variantToggle ? 
                                <i className="fa-solid fa-caret-down fa-xl" style={{color: '#000'}}></i> :
                                <i className="fa-solid fa-caret-up fa-xl" style={{color: '#000'}}></i>
                            }
                        </button>
                    </div>
                    {variantToggle &&
                        <div className={`variantsDisplay `} >
                            <h3 className="d-flex justify-content-center my-2">Variants</h3>
                            <div className="row">
                                {props.variants.map((variant) => {
                                    return <>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-6 d-flex justify-content-center" key={variant.variantName}>
                                            <h5 className="pl-3">{variant.variantName}</h5>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-6 d-flex justify-content-center" key={variant.price}>
                                            <h5 style={{fontWeight: 400}}>₹ {variant.price}</h5>
                                        </div>
                                    </>
                                })}
                            </div>
                        </div>
                    }
                </div>) : ''
            }
        </div>
        </>
    );
}