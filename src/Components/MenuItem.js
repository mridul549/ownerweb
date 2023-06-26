import React from 'react'
import '../css/menuitem.css'

export default function MenuItem() {
  return (
   
    <div class="card feature-card shadow-sm border-0 mb-5">
    <div class="row">
    <div class="col-lg-3 img-div">
        <img class="item-image" src="https://i.imgur.com/CkwB6CY.jpg" alt="grow together"/>
      </div>
      <div class="col-lg-1 veg">
      <img className="veg-img" src="https://i.imgur.com/qFC9XwF.png" alt="veg" />
      </div>
      <div class="col-lg-7 des">
        <h3 class="feature-heading">Original Masala Maggi</h3>
        <h3>Rs. 45</h3>
        <p>Generate meaningful discussions with your audience and build a strong, loyal community. 
          Think of the insightful conversations you miss out on with a feedback form.</p>
      </div>
      <div class="col-lg-1 ">
      <i className="fa-sharp fa-solid fa-pen icon"></i>
      </div>
    </div>
  </div>
  )
}
