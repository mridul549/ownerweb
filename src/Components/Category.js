import React from "react";
import "../css/category.css";

export default function Category(props) {
    return (
        <div className="cat">
            <button disabled={props.disabled} className={props.set===true ? "selected button" : "notselected button"} id={props._id} onClick={props.onClick}>
                <img className="iconImage" src={props.iconImage} alt="img" />
                <p style={{wordWrap: 'break-word'}} >{props.head}</p>
            </button>
        </div>
    );
}
