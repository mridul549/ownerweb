import React from "react";
import "../css/category.css";

export default function Category(props) {
    return (
        <div className="cat">
            <button className={props.set===true ? "selected" : "notselected"} onClick={props.onClick}>
                <img src={props.iconImage} alt="img" />
                <p>{props.head}</p>
            </button>
        </div>
    );
}
