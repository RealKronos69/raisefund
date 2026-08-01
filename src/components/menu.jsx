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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/user/logout`,{
                method:'POST',
                credentials:"include"
            })
            const data = await res.json()
            if (res.ok) {
                navigate('/user/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div ref={menu} className="fixed top-12 w-50 ease-in-out duration-100 -translate-x-38 rounded-r-3xl bg-white h-fit z-40 shadow-lg">
            <div className=" justify-between flex p-2 items-center">
                <h1 className="text-gray-800 pl-3 font-mono font-bold"></h1>
                <button className=" w-8 h-8 p-1 rounded-3xl text-white font-bold cursor-pointer flex justify-center items-center" onClick={handlemenu}>
                    {isopen ? <img className="w-full h-full" src={closeimg} /> : <img className="w-full h-full" src={menuimg} />}
                </button>
            </div>
            <div ref={menucontent} className="h-fit w-full hidden p-2">
                <div className="w-full h-full bg-gray-200 rounded-md *:text-gray-800 *:font-semibold flex justify-center items-center">
                    <ul className="flex *:font-bold gap-1 flex-col *:hover:bg-blue-300 w-full *:cursor-pointer text-sm *:rounded-md">
                        <NavLink to="/"><li className="w-full p-3 rounded-3xl flex pl-10 gap-4"><img src={homeimg} className="w-4 h-4" />Home</li></NavLink>
                        {/* <NavLink to="/user/profile"><li className="w-full p-3 rounded-3xl flex justify-center items-center gap-4"><img src={userimg} className="w-4 h-4 invert" />Profile</li></NavLink> */}
                        <NavLink className={({isActive})=> isActive ? 'bg-blue-300' : 'bg-gray-200'}  to="/user/dashboard"><li className="w-full p-3 rounded-3xl flex pl-10 gap-4"><img src={dashimg} className="w-4 h-4" />Dashboard</li></NavLink>
                        <NavLink  className={({isActive})=> isActive ? 'bg-blue-300' : 'bg-gray-200'}  to="/user/payments"><li className="w-full p-3 rounded-3xl flex pl-10 gap-4"><img src={walletimg} className="w-4 h-4" />Payments</li></NavLink>
                        <li onClick={()=>{handleLogout()}} className="w-full p-3 rounded-3xl flex pl-10 gap-4"><img src={logoutimg} className="w-4 h-4" />Logout</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Menu