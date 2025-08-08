import React from 'react'
import { Outlet, Route,Routes } from 'react-router-dom'
import NavBar from './NavBar'
import Login from './Login'
const Body = () => {
  return (
    <>
        <NavBar />
        <Outlet />
    </>
  )
}

export default Body