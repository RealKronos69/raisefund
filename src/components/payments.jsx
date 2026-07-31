import { useState, useRef, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom"


const Payments = () => {
    return (
        <section className="bg-gray-100 h-screen">
            <div className="flex justify-center fixed w-full z-20">
                <ul className="flex shadow-md">
                    <NavLink to="/user/payments/recieved"><li className="bg-blue-600 p-3 w-30 text-sm text-center cursor-pointer text-white font-semibold">Recieved</li></NavLink>
                    <NavLink to="/user/payments/donated"><li className="bg-blue-500 p-3 w-30 text-sm text-center cursor-pointer text-white font-semibold">Donated</li></NavLink>
                    <NavLink to="/user/payments/withdraw"><li className="bg-blue-400 p-3 w-30 text-sm text-center cursor-pointer text-white font-semibold">withdrawn</li></NavLink>
                </ul>
            </div>
            <section className="h-full pt-10">
                <Outlet />
            </section>
        </section>
    )
}

export default Payments