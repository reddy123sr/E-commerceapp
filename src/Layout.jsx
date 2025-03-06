import React from 'react'
import Header from './components/Header'
import Footer from './components/Footeer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen border-gray-400'>
        <div className='fixed min-w-screen'>
        <Header/>
        </div>
        <div className='flex-grow mt-20'>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Layout;