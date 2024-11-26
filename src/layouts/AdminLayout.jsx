import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SideBar from '../components/adminComponents/SideBar'
function AdminLayout() {
  return (
    <>
    <SideBar/>
    <main>
      <Outlet/>
    </main>
    
    
    
    </>
  )
}

export default AdminLayout