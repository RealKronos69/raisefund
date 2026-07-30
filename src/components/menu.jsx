import { useRef, useState, useEffect } from "react"
import menuimg from "../assets/menu.png"
import closeimg from "../assets/close.png"
import userimg from "../assets/user.png"
import homeimg from "../assets/home.png"
import dashimg from "../assets/dashboard.png"
import walletimg from "../assets/wallet.png"
import logoutimg from "../assets/logout.png"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Menu = () => {
    const menu = useRef()
    const menucontent = useRef()
    const [isopen, setisopen] = useState(false)
    const handlemenu = (e) => {
        menu.current.classList.toggle("-translate-x-38")
        menucontent.current.classList.toggle("hidden")
        setisopen(!isopen)
    }
    const navigate = useNavigate()
    const handleLogout = async()=>{
        try {
            const res = await fetch('http://localhost:3000/user/logout',{
                method:'POST',
                credentials:"include"
            })
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                navigate('/user/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div ref={menu} className="fixed top-0 w-50 ease-in-out duration-100 -translate-x-38 rounded-r-3xl bg-gray-950 h-fit z-40">
            <div className=" justify-between flex p-2 items-center">
                <h1 className="text-white pl-3 font-mono font-bold"></h1>
                <button className="bg-white w-8 h-8 p-1 rounded-3xl text-black font-bold cursor-pointer flex justify-center items-center" onClick={handlemenu}>
                    {isopen ? <img className="w-full h-full invert" src={closeimg} /> : <img className="w-full h-full invert" src={menuimg} />}
                </button>
            </div>
            <div ref={menucontent} className="h-80 w-full hidden p-2">
                <div className="w-full h-full bg-gray-900 rounded-3xl *:text-gray-100 *:font-semibold flex justify-center items-center">
                    <ul className="flex flex-col gap-4 *:hover:bg-gray-800 w-full *:cursor-pointer text-sm *:rounded-3xl">
                        <NavLink to="/"><li className="w-full p-3 rounded-3xl flex justify-center items-center gap-4"><img src={homeimg} className="w-4 h-4 invert" />Home</li></NavLink>
                        <NavLink to="/user/profile"><li className="w-full p-3 rounded-3xl flex justify-center items-center gap-4"><img src={userimg} className="w-4 h-4 invert" />Profile</li></NavLink>
                        <NavLink to="/user/dashboard"><li className="w-full p-3 rounded-3xl flex justify-center items-center gap-4"><img src={dashimg} className="w-4 h-4 invert" />Dashboard</li></NavLink>
                        <NavLink to="/user/payments"><li className="w-full p-3 rounded-3xl flex justify-center items-center gap-4"><img src={walletimg} className="w-4 h-4 invert" />Payments</li></NavLink>
                        <li onClick={()=>{handleLogout()}} className="w-full p-3 rounded-3xl flex justify-center items-center gap-4"><img src={logoutimg} className="w-4 h-4 invert" />Logout</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Menu