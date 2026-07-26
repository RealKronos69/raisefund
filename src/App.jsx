import { useState, useEffect, useRef } from "react"
import Pay from './components/pay'
import Navbar from './components/navbar'
import Home from './components/home'
import Footer from './components/footer'

function App() {
  
  return (
    <section>
      <Navbar/>
      <Home/>
      <Footer/>
    </section>
  )
}

export default App