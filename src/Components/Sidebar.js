import React from 'react'
import '../css/sidebar.css'
import {Link} from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='sidebar-wrapper container-fluid'>
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary sidebar shadow">
            <Link to="/dashboard" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <span class="fs-4">FlavR</span>
            </Link>
            <hr/>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <Link to="/dashboard/menu" class="nav-link active custom-nav-link" aria-current="page">
                     Menu
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/orders" class="nav-link link-body-emphasis">
                        Orders
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/outlet" class="nav-link link-body-emphasis">
                     Outlet
                    </Link>
                </li>
                </ul>
            <hr/>
            <div class="dropdown">
                <a href="/dashboard" class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" />
                    <strong>mdo</strong>
                </a>
                <ul class="dropdown-menu text-small shadow">
                    <li><a class="dropdown-item" href="/dashboard">New project...</a></li>
                    <li><a class="dropdown-item" href="/dashboard">Settings</a></li>
                    <li><a class="dropdown-item" href="/dashboard">Profile</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="/dashboard">Sign out</a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}