import React from 'react'
import '../css/sidebar.css'

export default function Sidebar() {
  return (
    <div className='sidebar-wrapper container-fluid'>
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary sidebar shadow">
            <a href="/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <span className="fs-4">FlavR</span>
            </a>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="/dashboard" className="nav-link active custom-nav-link" aria-current="page">
                        Menu
                    </a>
                </li>
                <li>
                    <a href="/dashboard" className="nav-link link-body-emphasis">
                        Orders
                    </a>
                </li>
                <li>
                    <a href="/dashboard" className="nav-link link-body-emphasis">
                    Outlet
                    </a>
                </li>
            </ul>
            <hr/>
            <div className="dropdown">
                <a href="/dashboard" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu text-small shadow">
                    <li><a className="dropdown-item" href="/dashboard">New project...</a></li>
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
