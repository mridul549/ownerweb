import React from 'react'
import MenuItem from './MenuItem'

export default function Menu() {
  return (
    <div className='container' style={{padding: 0, margin: 0}}>
      <h1>menu</h1>
      <div className="row">
        <div className="col-lg-6">
            <MenuItem />
        </div>
        <div className="col-lg-6">
            <MenuItem />
        </div>
        <div className="col-lg-6">
            <MenuItem />
        </div>
        <div className="col-lg-6">
            <MenuItem />
        </div>
        <div className="col-lg-6">
            <MenuItem />
        </div>
        <div className="col-lg-6">
            <MenuItem />
        </div>
      </div>
    </div>
  )
}
