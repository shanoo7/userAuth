import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer.jsx'



function Layouts() {
  return (
    <>
      <div className=''>
      <Navbar />
      <Outlet />
      <Footer/>
      <Toaster/>
      </div>
    </>
  )
}

export default Layouts;
