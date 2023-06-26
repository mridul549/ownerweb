import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Menu from './Menu'
import Orders from './Orders'
import Outlet from './Outlet'

export default function Dashboard() {
  return (
    <div>
      <Sidebar />
      <Routes>
                <Route path='/dashboard/menu' element={<Menu />} />
                <Route path='/dashboard/orders' element={<Orders />}/>
                <Route path='/dashboard/outlet' element={<Outlet />} />
            </Routes>
  
    </div>
  )
}