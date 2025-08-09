import React from 'react'
import { Outlet, Route,Routes } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
const Body = () => {
  return (
    <>
        <NavBar />
        <Outlet />
        <Footer/>
    </>
  )
}

export default Body