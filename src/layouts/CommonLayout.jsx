import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

function CommonLayout() {
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

export default CommonLayout