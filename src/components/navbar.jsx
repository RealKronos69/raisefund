import { useNavigate } from "react-router-dom"

const Navbar = ()=>{
    const navigate = useNavigate()
    return(
        <div className="p-3 bg-gray-800 *:text-white fixed top-0 w-full z-40">
            <nav className="flex justify-between">
                <h1 className="font-bold font-mono">RAISEFUND</h1>
                <ul className="flex gap-5 *:cursor-pointer *:font-mono *:hover:text-blue-300 font-semibold text-sm">
                    <li onClick={()=>{navigate("/user/dashboard#DONATIONS")}}>Donations</li>
                    <li>Trending</li>
                    <li onClick={()=>{navigate("/#LEADERBOARD")}}>Leaderboard</li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar