import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
function UserLayout() {
  return (
    <>
    <Header/>
    <main>
      <Outlet/>
    </main>
    
    
    <Footer/>
    </>
  )
}

export default UserLayout