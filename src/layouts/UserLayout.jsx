import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
function UserLayout() {
  return (
    <div div className='px-5'>
    <Header/>
    <main>
      <Outlet/>
    </main>
    
    
    <Footer/>
    </div>
  )
}

export default UserLayout