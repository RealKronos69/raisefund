import { useState, useEffect, useRef } from "react"
import Pay from './components/pay'
import Navbar from './components/navbar'
import Home from './components/home'
import Footer from './components/footer'
import Login from './components/login'
import Signup from './components/signup'
import { Outlet } from "react-router-dom"

function App() {
  
  return (
    <section className="">
      <Outlet/>
    </section>
  )
}

export default App