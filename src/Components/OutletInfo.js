import React from 'react'
import "../css/outletinfo.css";

export default function OutletInfo(props) {

  

return (
    <div className="card mb-3 shadow-sm" style={{maxWidth: "500px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={props.image==="null"?"https://i.imgur.com/6IVCvt5.jpg":props.image} style={{height: "100%", width: "100%", margin: 0}} className="img-fluid rounded-start" alt=".."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{props.head}</h5>
                        <p className="card-text" style={{color: "grey", fontWeight: "500",textAlign: 'justify', fontSize: "14px"}}>{props.address.addressLine1}, {props.address.city}, {props.address.state}-{props.address.zipCode}</p>
                    </div>
                </div>
            </div>
        </div>
  )
}
