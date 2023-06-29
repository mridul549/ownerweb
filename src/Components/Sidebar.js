import React from 'react'
import '../css/sidebar.css'
import {Link} from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='sidebar-wrapper container-fluid'>
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary sidebar shadow">
            <Link to="/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <span className="fs-4">FlavR</span>
            </Link>
            <ul className="nav nav-pills flex-column mb-auto ul">
                <li className="nav-item">
                    <Link to="/dashboard/menu" className="nav-link active custom-nav-link" aria-current="page">
                     Menu
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/orders" className="nav-link link-body-emphasis">
                        Orders
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/outlet" className="nav-link link-body-emphasis">
                     Outlet
                    </Link>
                </li>
                </ul>
            <hr/>
            <div className="dropdown">
                <a href="/" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="d-flex align-items-center">
                        <img src={localStorage.getItem('ownerProfilePic')} alt="" style={{ width: 32, height: 32, marginRight: '0.5rem' }} className="rounded-circle" />
                        <strong className='ownerName'>{localStorage.getItem('ownerName')}</strong>
                    </div>
                </a>
                <ul className="dropdown-menu text-small shadow">
                    <li><a className="dropdown-item" href="/dashboard">Settings</a></li>
                    <li><a className="dropdown-item" href="/dashboard">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="/dashboard">Sign out</a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}